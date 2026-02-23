import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { ComingSoonPageClient } from '@/components/pages/ComingSoonPageClient'

export const metadata: Metadata = {
  title: 'Amenities',
  description: 'Hot tub, fully equipped kitchen, comfortable bedrooms, and more at Perch in the Clouds.',
}

export default async function AmenitiesPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return (
    <ComingSoonPageClient
      initialContent={content}
      titleKey="luxe_amenities_title"
      titleFallback="Amenities"
      descriptionKey="luxe_amenities_description"
      descriptionFallback="Everything you need for the perfect mountain getaway"
      comingSoonTitleKey="luxe_amenities_coming_soon_title"
      comingSoonTitleFallback="Coming Soon"
      comingSoonDescKey="luxe_amenities_coming_soon_description"
      comingSoonDescFallback="This section will showcase all the wonderful amenities available at Perch in the Clouds, including the hot tub, fully equipped kitchen, comfortable bedrooms, and more."
    />
  )
}
