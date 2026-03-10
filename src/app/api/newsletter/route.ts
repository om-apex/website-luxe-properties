import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createOrUpdateContact } from '@/lib/hubspot'

const BRAND = 'om_luxe_properties'
const TAG = 'newsletter_luxe'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

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
    const { email, name } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const nameParts = name ? name.trim().split(/\s+/) : []
    const firstname = nameParts[0] || undefined
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { error: dbError } = await supabase
      .from('leads')
      .insert({
        email,
        firstname: firstname || null,
        lastname: lastname || null,
        brand: BRAND,
        form_type: 'newsletter',
        message: 'Newsletter subscription',
        metadata: { tag: TAG },
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    try {
      await createOrUpdateContact({ email, firstname, lastname, brand: BRAND })
    } catch (err) {
      console.error('HubSpot sync error:', err)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
