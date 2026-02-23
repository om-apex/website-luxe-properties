import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { ComingSoonPageClient } from '@/components/pages/ComingSoonPageClient'

export const metadata: Metadata = {
  title: 'Things to Do',
  description: 'Hiking, apple orchards, tubing, wineries and more activities near Perch in the Clouds in Ellijay.',
}

export default async function ThingsToDoPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return (
    <ComingSoonPageClient
      initialContent={content}
      titleKey="luxe_todo_title"
      titleFallback="Things to Do"
      descriptionKey="luxe_todo_description"
      descriptionFallback="Activities and adventures in the Ellijay area"
      comingSoonTitleKey="luxe_todo_coming_soon_title"
      comingSoonTitleFallback="Coming Soon"
      comingSoonDescKey="luxe_todo_coming_soon_description"
      comingSoonDescFallback="This section will feature exciting activities in the Ellijay area including hiking trails, apple orchards, tubing adventures, local wineries, and much more."
    />
  )
}
