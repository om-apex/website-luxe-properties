'use client'

import { OmLogoWithText } from '@om-apex/brand'
import { brand } from '@/lib/brand'

type LogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

interface LogoProps {
  size?: LogoSize
  className?: string
  showText?: boolean
}

export function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  return (
    <OmLogoWithText
      size={size}
      showText={showText}
      showTagline
      companyName={brand.company.shortName}
      tagline={brand.company.tagline}
      className={className}
      nameClassName="text-xl font-bold tracking-tight text-gray-900"
      nameStyle={{ fontFamily: 'var(--font-heading)' }}
    />
  )
}
