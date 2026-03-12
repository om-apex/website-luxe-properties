'use client'

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
  const email = content['luxe_global_contact_email'] || 'info@omluxeproperties.com'
  const phone = content['luxe_global_contact_phone'] || ''
  const location = content['luxe_global_contact_location'] || 'Roswell, GA'

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Om Luxe Properties LLC. All rights reserved.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          {location}
          {'\u00A0\u00A0|\u00A0\u00A0'}
          <a href={`mailto:${email}`} className="hover:text-brand-primary transition-colors">{email}</a>
          {phone && (
            <>
              {'\u00A0\u00A0|\u00A0\u00A0'}
              <a href={`tel:${phone}`} className="hover:text-brand-primary transition-colors">{formatPhone(phone)}</a>
            </>
          )}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          A subsidiary of Om Apex Holdings LLC
        </p>
      </div>
    </footer>
  )
}
