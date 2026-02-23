'use client'

import { EditableText } from '@/components/content/EditableText'
import { Mountain, Waves, Sunrise, Flame } from 'lucide-react'

const stats = [
  { icon: Mountain, valueKey: 'luxe_home_stats_views', labelKey: 'luxe_home_stats_views_label', valueFallback: '360\u00B0', labelFallback: 'Mountain Views' },
  { icon: Waves, valueKey: 'luxe_home_stats_river', labelKey: 'luxe_home_stats_river_label', valueFallback: 'River', labelFallback: 'Scenic Views' },
  { icon: Sunrise, valueKey: 'luxe_home_stats_sunrise', labelKey: 'luxe_home_stats_sunrise_label', valueFallback: 'Sunrise', labelFallback: '& Sunset Views' },
  { icon: Flame, valueKey: 'luxe_home_stats_hottub', labelKey: 'luxe_home_stats_hottub_label', valueFallback: 'Hot Tub', labelFallback: 'Private Relaxation' },
]

export function PropertyStats() {
  return (
    <section className="bg-brand-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.valueKey} className="flex flex-col items-center text-center gap-2">
                <Icon className="h-8 w-8 text-brand-accent" />
                <div className="text-2xl font-bold">
                  <EditableText contentKey={stat.valueKey} fallback={stat.valueFallback} />
                </div>
                <div className="text-sm text-white/80">
                  <EditableText contentKey={stat.labelKey} fallback={stat.labelFallback} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
