import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/components'
import { createOrUpdateContact } from '@/lib/hubspot'
import { sendEmail } from '@/lib/sendgrid'
import VerificationEmail from '@/emails/verification-email'

const BRAND = 'om_luxe_properties'
const BRAND_NAME = 'Om Luxe Properties'
const BRAND_COLOR = '#8B6914'
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

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://omluxeproperties.com'
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

    // Parse name into first/last
    const nameParts = name ? name.trim().split(/\s+/) : []
    const firstname = nameParts[0] || undefined
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Insert into Supabase leads table (existing behavior)
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
      // Duplicate lead is fine — continue to newsletter_subscribers
      if (!dbError.code?.includes('23505')) {
        console.error('[newsletter] Leads insert error:', dbError)
      }
    }

    // 2. Sync to HubSpot (non-blocking)
    try {
      await createOrUpdateContact({ email, firstname, lastname, brand: BRAND })
    } catch (err) {
      console.error('[newsletter] HubSpot sync error:', err)
    }

    // 3. Handle newsletter_subscribers with double opt-in
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id, status, verification_token, firstname, lastname')
      .eq('email', email)
      .eq('brand', BRAND)
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed!',
        })
      }

      if (existing.status === 'pending_verification') {
        // Resend verification email
        await sendVerificationEmail(email, existing.verification_token, firstname)
        return NextResponse.json({
          success: true,
          message: 'Check your email to confirm your subscription.',
        })
      }

      if (existing.status === 'unsubscribed') {
        // Reset to pending_verification
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            status: 'pending_verification',
            firstname: firstname || existing.firstname,
            lastname: lastname || existing.lastname,
            unsubscribed_at: null,
          })
          .eq('id', existing.id)

        if (updateError) {
          console.error('[newsletter] Subscriber update error:', updateError)
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again.' },
            { status: 500 }
          )
        }

        await sendVerificationEmail(email, existing.verification_token, firstname)
        return NextResponse.json({
          success: true,
          message: 'Check your email to confirm your subscription.',
        })
      }
    }

    // New subscriber — insert with pending_verification
    const { data: newSubscriber, error: subError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        firstname: firstname || null,
        lastname: lastname || null,
        brand: BRAND,
        status: 'pending_verification',
      })
      .select('verification_token')
      .single()

    if (subError) {
      console.error('[newsletter] Subscriber insert error:', subError)
      // Don't fail the whole request — leads insert already succeeded
      return NextResponse.json({
        success: true,
        message: 'Thanks for subscribing!',
      })
    }

    // Send verification email
    await sendVerificationEmail(email, newSubscriber.verification_token, firstname)

    return NextResponse.json({
      success: true,
      message: 'Check your email to confirm your subscription.',
    })
  } catch (error) {
    console.error('[newsletter] Subscription error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

async function sendVerificationEmail(
  email: string,
  verificationToken: string,
  firstName?: string
): Promise<void> {
  const siteUrl = getSiteUrl()
  const verifyUrl = `${siteUrl}/api/newsletter/verify?token=${verificationToken}`

  const html = await render(
    VerificationEmail({
      firstName,
      verifyUrl,
      brandName: BRAND_NAME,
      brandColor: BRAND_COLOR,
    })
  )

  const result = await sendEmail({
    to: email,
    subject: `Confirm your ${BRAND_NAME} newsletter subscription`,
    html,
  })

  if (!result.success) {
    console.error(`[newsletter] Failed to send verification email to ${email}: ${result.error}`)
  }
}
