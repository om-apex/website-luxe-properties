'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/things-to-do', label: 'Things to Do' },
  { href: '/attractions', label: 'Attractions' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/house-rules', label: 'House Rules' },
  { href: '/how-to-videos', label: 'How-To Videos' },
  { href: '/blog', label: 'Blog' },
  { href: '/newsletter', label: 'Newsletter' },
]

const BOOKING_URL = 'https://hometeam.guestybookings.com/properties/6892571cb8f8b500119e20ba'

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Logo size="2xl" showText />
          </Link>

          <nav className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === link.href ? 'text-brand-primary' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-brand-primary hover:bg-brand-primary-dark" size="sm">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book Direct <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                    pathname === link.href ? 'text-brand-primary' : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="bg-brand-primary hover:bg-brand-primary-dark w-full">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book Direct <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
