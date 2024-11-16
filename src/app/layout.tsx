import './globals.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'

import Providers from './providers'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Saudavelmente Saboroso | Sabor Prime',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          openSans.variable,
          'font-bebas-neue bg-white text-slate-400 antialiased light',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
