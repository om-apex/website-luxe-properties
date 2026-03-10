import { Metadata } from 'next'
import { NewsletterClient } from './NewsletterClient'

export const metadata: Metadata = {
  title: 'Newsletter — Om Luxe Properties',
  description: 'Subscribe to the Om Luxe Properties newsletter for updates on availability, local events in Ellijay, and travel inspiration.',
}

export default function NewsletterPage() {
  return <NewsletterClient />
}
