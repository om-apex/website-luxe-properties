import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/components'
import { sendEmail } from '@/lib/sendgrid'
import WelcomeEmail from '@/emails/welcome-email'

const BRAND = 'om_luxe_properties'
const BRAND_NAME = 'Om Luxe Properties'
const BRAND_COLOR = '#8B6914'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://omluxeproperties.com'
}

export async function GET(request: NextRequest) {
  const siteUrl = getSiteUrl()
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter?error=invalid-token`)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: subscriber, error } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, firstname, status, unsubscribe_token')
    .eq('verification_token', token)
    .eq('brand', BRAND)
    .single()

  if (error || !subscriber) {
    return NextResponse.redirect(`${siteUrl}/newsletter?error=invalid-token`)
  }

  if (subscriber.status === 'active') {
    return NextResponse.redirect(`${siteUrl}/newsletter?verified=already`)
  }

  // Update status to active
  const { error: updateError } = await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'active',
      verified_at: new Date().toISOString(),
    })
    .eq('id', subscriber.id)

  if (updateError) {
    console.error('[newsletter] Verify update error:', updateError)
    return NextResponse.redirect(`${siteUrl}/newsletter?error=verification-failed`)
  }

  // Send welcome email (non-blocking — don't fail verification if email fails)
  try {
    const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`

    const html = await render(
      WelcomeEmail({
        firstName: subscriber.firstname || undefined,
        unsubscribeUrl,
        brandName: BRAND_NAME,
        brandColor: BRAND_COLOR,
      })
    )

    await sendEmail({
      to: subscriber.email,
      subject: `Welcome to ${BRAND_NAME}!`,
      html,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
      },
    })
  } catch (err) {
    console.error('[newsletter] Failed to send welcome email:', err)
  }

  return NextResponse.redirect(`${siteUrl}/newsletter?verified=true`)
}
