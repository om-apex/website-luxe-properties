'use client'

import { EditableText } from '@/components/content/EditableText'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export function BookingCTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto rounded-3xl bg-gray-900 text-white p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <EditableText contentKey="luxe_home_booking_title" fallback="Ready to Perch in the Clouds?" />
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          <EditableText contentKey="luxe_home_booking_description" fallback="Experience the magic of Nature in Ellijay. May it be the beautiful sunrise, or the amazing twilight spectacle, or the view of the vast river bend, or the dark night's star gazing from the open hot tub at night, this property will not disappoint you. Book directly with us here." />
        </p>
        <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary-dark text-white rounded-full px-8">
          <a href="https://hometeam.guestybookings.com/properties/6892571cb8f8b500119e20ba" target="_blank" rel="noopener noreferrer">
            Book Direct <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <p className="text-sm text-gray-400 mt-3">(This property is managed by Home Team Vacation Rentals)</p>
      </div>
    </section>
  )
}
