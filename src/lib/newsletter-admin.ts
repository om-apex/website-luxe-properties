import { NextResponse } from 'next/server'

export function isAdminAuthenticated(request: Request): boolean {
  const secret = process.env.NEWSLETTER_ADMIN_SECRET
  if (!secret) return false

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false

  return authHeader.slice(7) === secret
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
