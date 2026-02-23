'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/blog-fetcher'
import { ArrowLeft } from 'lucide-react'

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <article>
      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="relative w-full h-[40vh] min-h-[300px]">
          <Image
            src={post.cover_image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-brand-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Blog
        </Link>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-brand-primary-light text-brand-primary font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-8 pb-8 border-b">
          <span className="font-medium">{post.author}</span>
          {post.published_at && (
            <>
              <span className="mx-2">&#183;</span>
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  )
}
