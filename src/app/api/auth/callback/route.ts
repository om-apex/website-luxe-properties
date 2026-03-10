import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirect = searchParams.get('redirect') || '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Check if user email is from omapex.com domain
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email && !user.email.endsWith('@omapex.com')) {
        // Sign out unauthorized users
        await supabase.auth.signOut()
        return NextResponse.redirect(`${origin}/?error=unauthorized`)
      }

      return NextResponse.redirect(`${origin}${redirect}`)
    }
  }

  // Return the user to the home page with an error
  return NextResponse.redirect(`${origin}/?error=auth_failed`)
}
