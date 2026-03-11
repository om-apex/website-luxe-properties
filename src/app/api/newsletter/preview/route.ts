import { NextRequest, NextResponse } from 'next/server'
import { render } from '@react-email/components'
import { isAdminAuthenticated, unauthorizedResponse } from '@/lib/newsletter-admin'
import { getNewsletterBySlug } from '@/lib/newsletter'
import NewsletterEmail from '@/emails/newsletter-template'

const BRAND_NAME = 'Om Luxe Properties'
const BRAND_COLOR = '#8B6914'

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://omluxeproperties.com'
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return unauthorizedResponse()
  }

  const slug = request.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'slug parameter is required' }, { status: 400 })
  }

  const newsletter = getNewsletterBySlug(slug)
  if (!newsletter) {
    return NextResponse.json({ error: `Newsletter not found: ${slug}` }, { status: 404 })
  }

  const siteUrl = getSiteUrl()

  const html = await render(
    NewsletterEmail({
      subject: newsletter.subject,
      previewText: newsletter.previewText,
      markdownContent: newsletter.content,
      unsubscribeUrl: `${siteUrl}/api/newsletter/unsubscribe?token=PREVIEW`,
      webViewUrl: `${siteUrl}/newsletter/${newsletter.slug}`,
      brandName: BRAND_NAME,
      brandColor: BRAND_COLOR,
    })
  )

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
