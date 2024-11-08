import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

import CartProvider from '@/providers/CartProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Toaster richColors />
        <CartProvider>{children}</CartProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
