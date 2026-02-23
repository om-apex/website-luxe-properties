import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { ComingSoonPageClient } from '@/components/pages/ComingSoonPageClient'

export const metadata: Metadata = {
  title: 'Restaurants',
  description: 'Local restaurant recommendations near Perch in the Clouds in Ellijay, Georgia.',
}

export default async function RestaurantsPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return (
    <ComingSoonPageClient
      initialContent={content}
      titleKey="luxe_restaurants_title"
      titleFallback="Restaurants"
      descriptionKey="luxe_restaurants_description"
      descriptionFallback="Local dining recommendations for your stay"
      comingSoonTitleKey="luxe_restaurants_coming_soon_title"
      comingSoonTitleFallback="Coming Soon"
      comingSoonDescKey="luxe_restaurants_coming_soon_description"
      comingSoonDescFallback="This section will feature our favorite local restaurants, from cozy cafes to fine dining, with recommendations for every occasion during your mountain getaway."
    />
  )
}
