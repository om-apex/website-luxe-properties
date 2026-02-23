'use client'

import { EditableText } from '@/components/content/EditableText'
import { Mountain, Sunrise, Flame, Waves } from 'lucide-react'

const highlights = [
  {
    icon: Mountain,
    titleKey: 'luxe_home_highlight1_title',
    titleFallback: '360\u00B0 Mountain Views',
    descKey: 'luxe_home_highlight1_description',
    descFallback: 'Immerse yourself in breathtaking panoramic views of the North Georgia mountains from every angle.',
  },
  {
    icon: Sunrise,
    titleKey: 'luxe_home_highlight2_title',
    titleFallback: 'Mesmerizing Sunrises & Sunsets',
    descKey: 'luxe_home_highlight2_description',
    descFallback: 'Wake up to golden sunrises and unwind with spectacular sunset views that paint the sky.',
  },
  {
    icon: Flame,
    titleKey: 'luxe_home_highlight3_title',
    titleFallback: 'Private Hot Tub',
    descKey: 'luxe_home_highlight3_description',
    descFallback: 'Relax under the stars in your private hot tub while taking in the stunning mountain scenery.',
  },
  {
    icon: Waves,
    titleKey: 'luxe_home_highlight4_title',
    titleFallback: 'River Views',
    descKey: 'luxe_home_highlight4_description',
    descFallback: 'Enjoy serene river views that add to the tranquil mountain retreat experience.',
  },
]

export function Highlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          <EditableText contentKey="luxe_home_highlights_title" fallback="Why Choose Perch in the Clouds?" />
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h) => {
            const Icon = h.icon
            return (
              <div key={h.titleKey} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-primary-light text-brand-primary mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <EditableText contentKey={h.titleKey} fallback={h.titleFallback} />
                </h3>
                <p className="text-sm text-gray-600">
                  <EditableText contentKey={h.descKey} fallback={h.descFallback} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
