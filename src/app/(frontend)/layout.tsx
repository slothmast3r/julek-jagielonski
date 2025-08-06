// app/layout.tsx
import './globals.css'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/utilities/ui'
import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { AdminBar } from '@/components/AdminBar'
import { Providers } from '@/providers'
import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import AppShell from './AppShell'
import { Footer } from '@/Footer/Component'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <head>
        <link href="/favicon.ico" rel="icon" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <AppShell headerData={headerData}>{children}</AppShell>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
