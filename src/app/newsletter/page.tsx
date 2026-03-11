import { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterClient } from './NewsletterClient'
import { getAllNewsletters } from '@/lib/newsletter'

export const metadata: Metadata = {
  title: 'Newsletter — Om Luxe Properties',
  description: 'Subscribe to the Om Luxe Properties newsletter for insights on property updates, travel tips, and exclusive offers.',
}

export default function NewsletterPage() {
  const newsletters = getAllNewsletters()

  return (
    <>
      <NewsletterClient />
      {newsletters.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Past Newsletters
              </h2>
              <div className="space-y-6">
                {newsletters.map((nl) => (
                  <Link
                    key={nl.slug}
                    href={`/newsletter/${nl.slug}`}
                    className="block group"
                  >
                    <article className="border border-gray-200 rounded-lg p-5 transition-colors hover:border-brand-primary/40 hover:bg-gray-50">
                      <time className="text-sm text-gray-500">
                        {new Date(nl.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-brand-primary transition-colors">
                        {nl.subject}
                      </h3>
                      {nl.previewText && (
                        <p className="text-gray-600 mt-1 text-sm">{nl.previewText}</p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
