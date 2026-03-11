import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BRAND = 'om_luxe_properties'

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
    .select('id, status')
    .eq('unsubscribe_token', token)
    .eq('brand', BRAND)
    .single()

  if (error || !subscriber) {
    return NextResponse.redirect(`${siteUrl}/newsletter?error=invalid-token`)
  }

  if (subscriber.status === 'unsubscribed') {
    return NextResponse.redirect(`${siteUrl}/newsletter?unsubscribed=already`)
  }

  const { error: updateError } = await supabase
    .from('newsletter_subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('id', subscriber.id)

  if (updateError) {
    console.error('[newsletter] Unsubscribe update error:', updateError)
    return NextResponse.redirect(`${siteUrl}/newsletter?error=unsubscribe-failed`)
  }

  return NextResponse.redirect(`${siteUrl}/newsletter?unsubscribed=true`)
}
