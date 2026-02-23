'use client'

import { EditableText } from '@/components/content/EditableText'
import { useContent } from '@/contexts/ContentContext'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function BookingCTA() {
  const { getContent } = useContent()
  const bookingUrl = getContent(
    'luxe_home_booking_url',
    'https://www.airbnb.com/rooms/1493555340407877948?guests=1&adults=1&s=67&unique_share_id=f23d455b-061d-47f9-bcb6-29fe8e1e16bb'
  )

  return (
    <section className="bg-brand-accent-light py-16">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          <EditableText contentKey="luxe_home_booking_title" fallback="Book Your Mountain Escape" />
        </h2>
        <p className="text-gray-600 mb-8">
          <EditableText contentKey="luxe_home_booking_description" fallback="Experience the magic of Ellijay from our luxurious mountain retreat. Book directly through Airbnb to secure your dates." />
        </p>
        <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary-dark text-lg px-8">
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Book on Airbnb <ExternalLink className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  )
}
