'use client'

import { useRouter } from 'next/navigation'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type ProductInCart = {
  id: string
  title: string
  quantity: number
  line: string
  price: number
  totalPrice: number
}

interface CartContextType {
  productsCart: ProductInCart[]
  addProductToCart: (
    id: string,
    title: string,
    line: string,
    stock: number,
    price: number,
  ) => void
  removeProductToCart: (id: string, price: number) => void
  removeProductFromCart: (id: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  const [productsCart, setProductsCart] = useState<ProductInCart[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('productsCart')
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  const router = useRouter()

  function addProductToCart(
    id: string,
    title: string,
    line: string,
    stock: number,
    price: number,
  ) {
    const productTitle = title
    const copyProductsCart = [...productsCart]
    const item = copyProductsCart.find((product) => product.id === id)
    const productLine = line

    if (!item) {
      copyProductsCart.push({
        id,
        title: productTitle,
        quantity: 1,
        price,
        line: productLine,
        totalPrice: price,
      })
    } else if (item.quantity < stock) {
      item.title = productTitle
      item.quantity += 1
      item.totalPrice = item.quantity * price
      item.line = productLine
    }

    setProductsCart(copyProductsCart)
  }

  function removeProductToCart(id: string, price: number) {
    const copyProductsCart = [...productsCart]
    const item = copyProductsCart.find((product) => product.id === id)

    if (item && item.quantity > 1) {
      item.quantity -= 1
      item.totalPrice = item.quantity * price
      setProductsCart(copyProductsCart)
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id,
      )
      setProductsCart(arrayFiltered)
    }
  }

  function removeProductFromCart(id: string) {
    const updatedCart = productsCart.filter((product) => product.id !== id)
    setProductsCart(updatedCart)
  }

  function clearCart() {
    setProductsCart([])
    router.push('/')
  }

  useEffect(() => {
    localStorage.setItem('productsCart', JSON.stringify(productsCart))
  }, [productsCart])

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addProductToCart,
        removeProductToCart,
        removeProductFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
