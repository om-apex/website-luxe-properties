import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPublishedPosts } from '@/lib/blog-fetcher'
import { BlogPostClient } from '@/components/pages/BlogPostClient'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'om_luxe_properties')

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || `${post.title} - Om Luxe Properties Blog`,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts('om_luxe_properties')
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug, 'om_luxe_properties')

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
