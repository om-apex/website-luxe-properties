import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { EditModeProvider } from "@/contexts/EditModeContext"
import { getSiteContent, getCompanyContact } from "@/lib/content-fetcher"
import { DEFAULT_CONTENT } from "@/lib/content"

export const metadata: Metadata = {
  title: {
    default: "Perch in the Clouds | Om Luxe Properties",
    template: "%s | Om Luxe Properties",
  },
  description: "Luxury mountain vacation rental in Ellijay, Georgia. 3 bedrooms, 3 bathrooms, 360° mountain views, private hot tub, and river views. Book your mountain escape today.",
  keywords: ["Ellijay cabin", "Georgia mountain rental", "luxury vacation rental", "Perch in the Clouds", "North Georgia mountains", "hot tub cabin"],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const dbContent = await getSiteContent('luxe')
  const companyContact = await getCompanyContact('om-luxe-properties', {
    phone: 'luxe_global_contact_phone',
    email: 'luxe_global_contact_email',
    name: 'luxe_global_company_name',
  })
  const defaults: Record<string, string> = {}
  for (const [key, val] of Object.entries(DEFAULT_CONTENT)) {
    defaults[key] = val.value
  }
  const footerContent = { ...defaults, ...dbContent, ...companyContact }

  return (
    <html lang="en">
      <body className="antialiased">
        <EditModeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer content={footerContent} />
          </div>
        </EditModeProvider>
      </body>
    </html>
  )
}
