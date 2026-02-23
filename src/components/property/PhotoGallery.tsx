'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { EditableText } from '@/components/content/EditableText'
import { Lightbox } from '@/components/property/Lightbox'
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, type GalleryCategory } from '@/lib/gallery-data'
import { cn } from '@/lib/utils'

export function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_PHOTOS
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="py-16 bg-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            <EditableText contentKey="luxe_home_gallery_title" fallback="Explore the Property" />
          </h2>
          <p className="text-gray-600">
            <EditableText contentKey="luxe_home_gallery_subtitle" fallback="84 photos showcasing every corner of your mountain retreat" />
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                activeCategory === category
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({GALLERY_PHOTOS.filter((p) => p.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.src}
              onClick={() => setLightboxIndex(index)}
              className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <span className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrevious={() => setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1))}
          onNext={() => setLightboxIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0))}
        />
      )}
    </section>
  )
}
