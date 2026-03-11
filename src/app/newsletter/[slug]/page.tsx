import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAllNewsletters, getNewsletterBySlug } from '@/lib/newsletter'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllNewsletters().map((nl) => ({ slug: nl.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const newsletter = getNewsletterBySlug(slug)
  if (!newsletter) return { title: 'Newsletter Not Found' }
  return {
    title: `${newsletter.subject} — Om Luxe Properties`,
    description: newsletter.previewText || newsletter.subject,
  }
}

export default async function NewsletterArticlePage({ params }: Props) {
  const { slug } = await params
  const newsletter = getNewsletterBySlug(slug)
  if (!newsletter) notFound()

  return (
    <div className="bg-white min-h-screen">
      <article className="container mx-auto px-4 py-16 max-w-2xl">
        <Link
          href="/newsletter"
          className="text-sm text-gray-500 hover:text-brand-primary transition-colors mb-8 inline-block"
        >
          &larr; All Newsletters
        </Link>

        <time className="block text-sm text-gray-500 mb-2">
          {new Date(newsletter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {newsletter.subject}
        </h1>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {newsletter.content}
          </ReactMarkdown>
        </div>

        <hr className="my-12 border-gray-200" />

        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Enjoy this newsletter?
          </h2>
          <p className="text-gray-600 mb-4">
            Subscribe to get the latest insights delivered to your inbox.
          </p>
          <Link
            href="/newsletter"
            className="inline-block bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </article>
    </div>
  )
}
