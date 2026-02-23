'use client'

import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { Phone } from 'lucide-react'

interface FooterProps {
  content?: Record<string, string>
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, '')
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return raw
}

export function Footer({ content = {} }: FooterProps) {
  const get = (key: string, fallback: string) => content[key] || fallback

  const companyName = get('luxe_global_company_name', 'Om Luxe Properties')
  const tagline = get('luxe_footer_tagline', 'Luxury mountain vacation rentals in Ellijay, Georgia. Experience the magic of the North Georgia mountains.')
  const linksTitle = get('luxe_footer_links_title', 'Explore')
  const contactTitle = get('luxe_footer_contact_title', 'Contact')
  const location = get('luxe_footer_location', 'Ellijay, Georgia')
  const email = get('luxe_global_contact_email', 'hello@omluxeproperties.com')
  const phone = get('luxe_global_contact_phone', '')
  const copyright = get('luxe_global_copyright', 'Om Luxe Properties LLC. All rights reserved.')
  const parentCompany = get('luxe_global_parent_company', 'Om Apex Holdings')
  const parentUrl = get('luxe_global_parent_url', 'https://omapex.com')

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <span className="font-semibold text-lg text-gray-900">{companyName}</span>
            </div>
            <p className="text-sm text-gray-600">{tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{linksTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/amenities" className="hover:text-brand-primary transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="/things-to-do" className="hover:text-brand-primary transition-colors">
                  Things to Do
                </Link>
              </li>
              <li>
                <Link href="/how-to-videos" className="hover:text-brand-primary transition-colors">
                  How-To Videos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href={parentUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                  {parentCompany}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{contactTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{location}</li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-brand-primary transition-colors">
                  {email}
                </a>
              </li>
              {phone && (
                <li className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <a href={`tel:${phone}`} className="hover:text-brand-primary transition-colors">
                    {formatPhone(phone)}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {copyright}</p>
          <p className="mt-1">A subsidiary of <a href={parentUrl} className="hover:text-brand-primary transition-colors">{parentCompany}</a></p>
        </div>
      </div>
    </footer>
  )
}
