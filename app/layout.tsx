import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Shelltap — Learn by doing',
  description: 'Hands-on labs for Git, Docker, and Linux. Run the command, see what changes, and build real developer muscle memory.',
  generator: 'Shelltap',
  metadataBase: new URL('https://shelltap.dev'),
  openGraph: { title: 'Shelltap — Learn by doing', description: 'Hands-on labs for the tools that ship software.', type: 'website' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070a09',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
