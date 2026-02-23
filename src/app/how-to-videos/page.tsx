import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { HowToVideosPageClient } from '@/components/pages/HowToVideosPageClient'

export const metadata: Metadata = {
  title: 'How-To Videos',
  description: 'Video guides for TV, fireplace, theater, murphy bed, Google Home, and shower at Perch in the Clouds.',
}

export default async function HowToVideosPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return <HowToVideosPageClient initialContent={content} />
}
