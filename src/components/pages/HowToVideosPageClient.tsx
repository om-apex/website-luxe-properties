'use client'

import { ContentProvider } from '@/contexts/ContentContext'
import { EditableText } from '@/components/content/EditableText'

const VIDEOS = [
  { id: 'O5QuW3ZL7uM', titleKey: 'luxe_howto_video1_title', titleFallback: 'TV & Fireplace', descKey: 'luxe_howto_video1_description', descFallback: 'Learn how to operate the smart TV and electric fireplace in the living room.' },
  { id: 'w1KMslEySok', titleKey: 'luxe_howto_video2_title', titleFallback: 'Theater Remote', descKey: 'luxe_howto_video2_description', descFallback: 'Quick guide to using the home theater system and remote controls.' },
  { id: 'JGWGf38xCeo', titleKey: 'luxe_howto_video3_title', titleFallback: 'Murphy Bed', descKey: 'luxe_howto_video3_description', descFallback: 'How to fold down and set up the murphy bed in the office suite.' },
  { id: 'voWUtTW4w-c', titleKey: 'luxe_howto_video4_title', titleFallback: 'Google Home', descKey: 'luxe_howto_video4_description', descFallback: 'Using the Google Home device for music, weather, and smart home controls.' },
  { id: 'ZVn_Ij0-9gQ', titleKey: 'luxe_howto_video5_title', titleFallback: 'Basement Shower', descKey: 'luxe_howto_video5_description', descFallback: 'Operating the shower controls in the basement bathroom.' },
]

interface HowToVideosPageClientProps {
  initialContent: Record<string, string>
}

export function HowToVideosPageClient({ initialContent }: HowToVideosPageClientProps) {
  return (
    <ContentProvider initialContent={initialContent}>
      <section className="bg-brand-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <EditableText contentKey="luxe_howto_title" fallback="How-To Videos" />
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            <EditableText contentKey="luxe_howto_description" fallback="Quick video guides to help you get the most out of your stay at Perch in the Clouds." />
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEOS.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.titleFallback}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <EditableText contentKey={video.titleKey} fallback={video.titleFallback} />
                  </h3>
                  <p className="text-sm text-gray-600">
                    <EditableText contentKey={video.descKey} fallback={video.descFallback} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ContentProvider>
  )
}
