import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Newsletter {
  slug: string
  subject: string
  previewText: string
  date: string
  content: string // raw markdown body
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content/newsletters')

export function getAllNewsletters(): Newsletter[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))

  const newsletters = files
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)

      const slug = data.slug || filename.replace(/\.md$/, '')

      return {
        slug,
        subject: data.subject || 'Untitled Newsletter',
        previewText: data.previewText || '',
        date: data.date || '',
        content,
      } satisfies Newsletter
    })
    .filter((n) => n.date) // skip malformed entries

  // Sort by date descending (newest first)
  newsletters.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return newsletters
}

export function getNewsletterBySlug(slug: string): Newsletter | undefined {
  return getAllNewsletters().find((n) => n.slug === slug)
}
