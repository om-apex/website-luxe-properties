import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createOrUpdateContact, createDeal } from '@/lib/hubspot'

const BRAND = 'om_luxe_properties'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Simple in-memory rate limiting: max 5 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
  rateLimitMap.set(ip, recent)

  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  rateLimitMap.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, firstname, lastname, company, phone, message, formType, metadata } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert({
        email,
        firstname: firstname || null,
        lastname: lastname || null,
        company: company || null,
        phone: phone || null,
        brand: BRAND,
        form_type: formType || 'general',
        message,
        metadata: metadata || {},
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    let hubspotContactId: string | null = null
    let hubspotSynced = false
    try {
      hubspotContactId = await createOrUpdateContact({
        email,
        firstname,
        lastname,
        company,
        phone,
        brand: BRAND,
      })

      const dealName = `Contact — ${firstname || ''} ${lastname || ''} (${email})`.trim()
      await createDeal(hubspotContactId, dealName, BRAND)
      hubspotSynced = true
    } catch (err) {
      console.error('HubSpot sync error:', err)
    }

    if (hubspotContactId) {
      await supabase
        .from('leads')
        .update({ hubspot_contact_id: hubspotContactId, hubspot_synced: hubspotSynced })
        .eq('id', lead.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
