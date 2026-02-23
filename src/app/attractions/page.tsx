import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { ComingSoonPageClient } from '@/components/pages/ComingSoonPageClient'

export const metadata: Metadata = {
  title: 'Attractions',
  description: 'State parks, waterfalls, scenic overlooks, and historic downtown Ellijay near Perch in the Clouds.',
}

export default async function AttractionsPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return (
    <ComingSoonPageClient
      initialContent={content}
      titleKey="luxe_attractions_title"
      titleFallback="Attractions"
      descriptionKey="luxe_attractions_description"
      descriptionFallback="Must-visit destinations near Perch in the Clouds"
      comingSoonTitleKey="luxe_attractions_coming_soon_title"
      comingSoonTitleFallback="Coming Soon"
      comingSoonDescKey="luxe_attractions_coming_soon_description"
      comingSoonDescFallback="This section will showcase nearby attractions including state parks, waterfalls, scenic overlooks, historic downtown Ellijay, and other must-visit destinations."
    />
  )
}
