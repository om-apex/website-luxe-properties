import type { Metadata } from 'next'
import { getSiteContent } from '@/lib/content-fetcher'
import { DEFAULT_CONTENT } from '@/lib/content'
import { ComingSoonPageClient } from '@/components/pages/ComingSoonPageClient'

export const metadata: Metadata = {
  title: 'House Rules',
  description: 'Check-in, check-out, hot tub rules, quiet hours, and property guidelines for Perch in the Clouds.',
}

export default async function HouseRulesPage() {
  const dbContent = await getSiteContent('luxe')
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const content = { ...defaults, ...dbContent }
  return (
    <ComingSoonPageClient
      initialContent={content}
      titleKey="luxe_rules_title"
      titleFallback="House Rules"
      descriptionKey="luxe_rules_description"
      descriptionFallback="Guidelines for a smooth and enjoyable stay"
      comingSoonTitleKey="luxe_rules_coming_soon_title"
      comingSoonTitleFallback="Coming Soon"
      comingSoonDescKey="luxe_rules_coming_soon_description"
      comingSoonDescFallback="This section will outline check-in/check-out procedures, property guidelines, hot tub rules, quiet hours, and other important information to ensure a smooth and enjoyable stay."
    />
  )
}
