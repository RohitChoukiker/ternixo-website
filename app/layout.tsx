import { Analytics } from '@vercel/analytics/next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap', weight: ['600'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' })

export const metadata: Metadata = {
  title: siteConfig.title, description: siteConfig.description, generator: siteConfig.name,
  applicationName: siteConfig.name, metadataBase: new URL(siteConfig.url), alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/favicon.ico', type: 'image/x-icon' }, { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }], shortcut: ['/favicon.ico'], apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }] },
  openGraph: { title: siteConfig.title, description: siteConfig.description, type: 'website', url: siteConfig.url, siteName: siteConfig.name, images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Ternixo — learn Git, Docker, and Linux by doing' }] },
  twitter: { card: 'summary_large_image', title: siteConfig.title, description: siteConfig.description, images: [{ url: '/opengraph-image', alt: 'Ternixo — learn Git, Docker, and Linux by doing' }] },
}
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#0a0d12', width: 'device-width', initialScale: 1 }
const structuredData = [
  { '@context': 'https://schema.org', '@type': 'Organization', name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/logo-512.png`, email: siteConfig.email },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url } },
]
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
