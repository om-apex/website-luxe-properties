import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { HomePageClient } from '@/components/pages/HomePageClient'

export default async function HomePage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return <HomePageClient initialContent={content} />
}
