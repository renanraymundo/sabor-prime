import './globals.css'

import type { Metadata } from 'next'
import { Bebas_Neue, Dancing_Script } from 'next/font/google'

import { cn } from '@/lib/utils'

import Providers from './providers'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: ['400'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
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
          bebasNeue.variable,
          dancingScript.variable,
          'bg-white font-bebas-neue text-slate-400 antialiased light',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
