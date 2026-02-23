'use client'

import { ContentProvider } from '@/contexts/ContentContext'
import { EditableText } from '@/components/content/EditableText'
import { Clock } from 'lucide-react'

interface ComingSoonPageClientProps {
  initialContent: Record<string, string>
  titleKey: string
  titleFallback: string
  descriptionKey: string
  descriptionFallback: string
  comingSoonTitleKey: string
  comingSoonTitleFallback: string
  comingSoonDescKey: string
  comingSoonDescFallback: string
}

export function ComingSoonPageClient({
  initialContent,
  titleKey,
  titleFallback,
  descriptionKey,
  descriptionFallback,
  comingSoonTitleKey,
  comingSoonTitleFallback,
  comingSoonDescKey,
  comingSoonDescFallback,
}: ComingSoonPageClientProps) {
  return (
    <ContentProvider initialContent={initialContent}>
      <div className="min-h-[60vh] flex flex-col">
        {/* Page Header */}
        <section className="bg-brand-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              <EditableText contentKey={titleKey} fallback={titleFallback} />
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              <EditableText contentKey={descriptionKey} fallback={descriptionFallback} />
            </p>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className="flex-1 flex items-center justify-center py-16">
          <div className="container mx-auto px-4 text-center max-w-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-light text-brand-primary mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              <EditableText contentKey={comingSoonTitleKey} fallback={comingSoonTitleFallback} />
            </h2>
            <p className="text-gray-600">
              <EditableText contentKey={comingSoonDescKey} fallback={comingSoonDescFallback} />
            </p>
          </div>
        </section>
      </div>
    </ContentProvider>
  )
}
