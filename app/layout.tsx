import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AnnouncementBar from '@/components/AnnouncementBar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Dingbro Ltd — Scotland's Largest Independent Motor Factor",
    template: '%s | Dingbro Ltd',
  },
  description:
    "Since 1973, Dingbro has been Scotland's leading wholesale distributor of motor vehicle components, bodyshop supplies, and truck & trailer parts. 29 sites. 1,500+ employees. Trade only.",
  openGraph: {
    siteName: 'Dingbro Ltd',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <AnnouncementBar />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
