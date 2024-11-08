import type { Metadata } from 'next'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { WhatsAppBubble } from '@/components/WhatsAppBubble'

export const metadata: Metadata = {
  title: 'Saudavelmente Saboroso | Sabor Prime',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="theme-vertical-center flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  )
}
