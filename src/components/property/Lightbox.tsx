'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryPhoto } from '@/lib/gallery-data'

interface LightboxProps {
  photos: GalleryPhoto[]
  currentIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}

export function Lightbox({ photos, currentIndex, onClose, onPrevious, onNext }: LightboxProps) {
  const photo = photos[currentIndex]

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrevious()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrevious, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!photo) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrevious() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-10 w-10" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2"
        aria-label="Next photo"
      >
        <ChevronRight className="h-10 w-10" />
      </button>

      <div className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full h-full max-h-[75vh]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <div className="text-white text-center mt-4">
          <p className="text-lg">{photo.caption}</p>
          <p className="text-sm text-white/60 mt-1">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  )
}
