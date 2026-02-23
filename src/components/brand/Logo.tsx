'use client'

import Image from 'next/image'
import { brand } from '@/lib/brand'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

const sizeMap = {
  sm: { width: 32, height: 32, textClass: 'text-lg' },
  md: { width: 40, height: 40, textClass: 'text-xl' },
  lg: { width: 48, height: 48, textClass: 'text-2xl' },
  xl: { width: 64, height: 64, textClass: 'text-3xl' },
}

export function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const { width, height, textClass } = sizeMap[size]

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={brand.logo.svg}
        alt={brand.company.name}
        width={width}
        height={height}
        className="flex-shrink-0"
        priority
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-semibold ${textClass} text-gray-900 leading-tight`}>
            {brand.company.shortName}
          </span>
          <span className="text-xs text-gray-500">{brand.company.tagline}</span>
        </div>
      )}
    </div>
  )
}
