import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { render } from '@react-email/components'
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/newsletter-admin'
import { getNewsletterBySlug } from '@/lib/newsletter'
import { sendEmail } from '@/lib/sendgrid'
import NewsletterEmail from '@/emails/newsletter-template'

const BRAND = 'om_luxe_properties'
const BRAND_NAME = 'Om Luxe Properties'
const BRAND_COLOR = '#8B6914'
const BATCH_SIZE = 50
const BATCH_DELAY_MS = 100

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://omluxeproperties.com'
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated(request)) {
    return unauthorizedResponse()
  }

  const body = await request.json()
  const { slug } = body

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const newsletter = getNewsletterBySlug(slug)
  if (!newsletter) {
    return NextResponse.json({ error: `Newsletter not found: ${slug}` }, { status: 404 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const siteUrl = getSiteUrl()

  // Frequency cap: max 1 send per brand per 24 hours
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: recentSends } = await supabase
    .from('newsletter_sends')
    .select('id')
    .eq('brand', BRAND)
    .gte('sent_at', twentyFourHoursAgo)
    .limit(1)

  if (recentSends && recentSends.length > 0) {
    return NextResponse.json(
      { error: 'A newsletter was already sent today. Max 1 per brand per day.' },
      { status: 429 }
    )
  }

  // Fetch all active subscribers
  const { data: subscribers, error: subError } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, firstname, unsubscribe_token')
    .eq('brand', BRAND)
    .eq('status', 'active')

  if (subError) {
    console.error('[newsletter-send] Failed to fetch subscribers:', subError)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: 'No active subscribers' }, { status: 400 })
  }

  // Create newsletter_sends record
  const { data: sendRecord, error: sendError } = await supabase
    .from('newsletter_sends')
    .insert({
      brand: BRAND,
      subject: newsletter.subject,
      preview_text: newsletter.previewText,
      content_markdown: newsletter.content,
      status: 'sending',
      total_recipients: subscribers.length,
    })
    .select('id')
    .single()

  if (sendError || !sendRecord) {
    console.error('[newsletter-send] Failed to create send record:', sendError)
    return NextResponse.json({ error: 'Failed to create send record' }, { status: 500 })
  }

  const sendId = sendRecord.id
  let totalDelivered = 0

  // Send in batches
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE)

    const results = await Promise.allSettled(
      batch.map(async (subscriber) => {
        const unsubscribeUrl = `${siteUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`
        const webViewUrl = `${siteUrl}/newsletter/${newsletter.slug}`

        const html = await render(
          NewsletterEmail({
            subject: newsletter.subject,
            previewText: newsletter.previewText,
            markdownContent: newsletter.content,
            unsubscribeUrl,
            webViewUrl,
            brandName: BRAND_NAME,
            brandColor: BRAND_COLOR,
          })
        )

        const result = await sendEmail({
          to: subscriber.email,
          subject: newsletter.subject,
          html,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>`,
          },
        })

        // Insert send_recipient record
        await supabase.from('newsletter_send_recipients').insert({
          send_id: sendId,
          subscriber_id: subscriber.id,
          sendgrid_message_id: result.messageId || null,
          status: result.success ? 'sent' : 'failed',
          sent_at: result.success ? new Date().toISOString() : null,
        })

        return result.success
      })
    )

    totalDelivered += results.filter(
      (r) => r.status === 'fulfilled' && r.value === true
    ).length

    // Pause between batches to avoid rate limits
    if (i + BATCH_SIZE < subscribers.length) {
      await sleep(BATCH_DELAY_MS)
    }
  }

  // Update send record
  await supabase
    .from('newsletter_sends')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
      total_delivered: totalDelivered,
    })
    .eq('id', sendId)

  return NextResponse.json({
    success: true,
    sendId,
    totalRecipients: subscribers.length,
    totalDelivered,
  })
}
