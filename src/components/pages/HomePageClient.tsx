'use client'

import { ContentProvider } from '@/contexts/ContentContext'
import { HeroVideo } from '@/components/property/HeroVideo'
import { PropertyStats } from '@/components/property/PropertyStats'
import { BookingCTA } from '@/components/property/BookingCTA'
import { PhotoGallery } from '@/components/property/PhotoGallery'
import { Highlights } from '@/components/property/Highlights'

interface HomePageClientProps {
  initialContent: Record<string, string>
}

export function HomePageClient({ initialContent }: HomePageClientProps) {
  return (
    <ContentProvider initialContent={initialContent}>
      <HeroVideo />
      <PropertyStats />
      <BookingCTA />
      <PhotoGallery />
      <Highlights />
    </ContentProvider>
  )
}
