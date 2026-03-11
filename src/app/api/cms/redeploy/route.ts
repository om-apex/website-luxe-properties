import { NextResponse } from 'next/server'

export async function POST() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL

  if (!hookUrl) {
    return NextResponse.json(
      { error: 'Deploy hook not configured' },
      { status: 500 }
    )
  }

  try {
    const res = await fetch(hookUrl, { method: 'POST' })

    if (!res.ok) {
      console.error('[CMS Redeploy] Deploy hook returned', res.status)
      return NextResponse.json(
        { error: 'Deploy trigger failed' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Deploy triggered' })
  } catch (err) {
    console.error('[CMS Redeploy] Error:', err)
    return NextResponse.json(
      { error: 'Failed to trigger deploy' },
      { status: 500 }
    )
  }
}
