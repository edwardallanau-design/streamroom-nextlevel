import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

const CHANNEL = process.env.NEXT_PUBLIC_TWITCH_CHANNEL ?? 'piggyplaysph'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CHANNEL} — Stream Room`,
    template: `%s | ${CHANNEL}`,
  },
  description: `Watch ${CHANNEL} live on Twitch. Tune in for live streams and join the chat.`,
  openGraph: {
    type: 'website',
    siteName: 'Stream Room',
    title: `${CHANNEL} — Stream Room`,
    description: `Watch ${CHANNEL} live on Twitch. Tune in for live streams and join the chat.`,
    images: [{ url: '/logo-meta.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CHANNEL} — Stream Room`,
    description: `Watch ${CHANNEL} live on Twitch. Tune in for live streams and join the chat.`,
    images: ['/logo-meta.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-cyber-bg text-cyber-text`}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
