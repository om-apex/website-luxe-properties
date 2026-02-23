import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/blog-fetcher'
import { BlogListClient } from '@/components/pages/BlogListClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Travel tips, local guides, and updates from Om Luxe Properties and Perch in the Clouds.',
}

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPublishedPosts('om_luxe_properties')
  return <BlogListClient posts={posts} />
}
