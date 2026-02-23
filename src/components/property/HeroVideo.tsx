'use client'

import { EditableText } from '@/components/content/EditableText'
import { Bed, Bath, Users } from 'lucide-react'

export function HeroVideo() {
  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero/aerial-drone-tour.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 text-white text-center px-4">
        <p className="text-sm uppercase tracking-widest text-white/80 mb-2">
          <EditableText contentKey="luxe_home_hero_location" fallback="Ellijay, Georgia" className="text-white/80" />
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <EditableText contentKey="luxe_home_hero_property_name" fallback="Perch in the Clouds" />
        </h1>
        <div className="flex items-center gap-6 text-lg">
          <span className="flex items-center gap-2">
            <Bed className="h-5 w-5" />
            <EditableText contentKey="luxe_home_hero_bedrooms" fallback="3 Bedrooms" />
          </span>
          <span className="flex items-center gap-2">
            <Bath className="h-5 w-5" />
            <EditableText contentKey="luxe_home_hero_bathrooms" fallback="3 Bathrooms" />
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <EditableText contentKey="luxe_home_hero_sleeps" fallback="Sleeps 6" />
          </span>
        </div>
      </div>
    </section>
  )
}
