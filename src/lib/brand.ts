export interface BrandColors {
  primary: string
  primaryDark: string
  primaryLight: string
  accent: string
  accentLight: string
}

export interface BrandFonts {
  heading: string
  body: string
}

export interface CompanyInfo {
  name: string
  shortName: string
  tagline: string
  email: string
  location: string
}

export interface Brand {
  colors: BrandColors
  fonts: BrandFonts
  company: CompanyInfo
  logo: {
    png: string
    svg: string
  }
}

export const brandHex = {
  primary: '#2E7D32',
  accent: '#C9A227',
} as const

export const brandOklch = {
  primary: 'oklch(0.467 0.13 148.7)',
  primaryDark: 'oklch(0.38 0.13 148.7)',
  primaryLight: 'oklch(0.95 0.03 148.7)',
  accent: 'oklch(0.725 0.145 85.4)',
  accentLight: 'oklch(0.95 0.04 85.4)',
} as const

export const omLuxeProperties: Brand = {
  colors: {
    primary: brandOklch.primary,
    primaryDark: brandOklch.primaryDark,
    primaryLight: brandOklch.primaryLight,
    accent: brandOklch.accent,
    accentLight: brandOklch.accentLight,
  },
  fonts: {
    heading: "'Noto Serif', serif",
    body: "'Noto Sans', sans-serif",
  },
  company: {
    name: 'Om Luxe Properties LLC',
    shortName: 'Om Luxe Properties',
    tagline: 'Luxury Vacation Rentals',
    email: 'hello@omluxeproperties.com',
    location: 'Ellijay, Georgia',
  },
  logo: {
    png: '/images/logo.png',
    svg: '/images/logo.svg',
  },
}

export const brand = omLuxeProperties
