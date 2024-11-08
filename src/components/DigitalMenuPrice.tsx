'use client'

import { cn } from '@nextui-org/react'

import { useCart } from '@/providers/CartProvider'

type DigitalMenuPriceProps = {
  id?: string
  price: number
  size: 'sm' | 'md' | 'lg'
}

export function DigitalMenuPrice({
  id,
  size = 'md',
  price,
}: DigitalMenuPriceProps) {
  const { productsCart } = useCart()

  const quantity = productsCart.find((item) => item.id === id)?.quantity
  const totalPrice = quantity && quantity * price
  return (
    <span
      className={cn('text-secondary-100', {
        'text-small': size === 'sm',
        'text-4xl': size === 'md',
        'text-5xl': size === 'lg',
      })}
    >
      {`R$ ${
        quantity
          ? totalPrice?.toFixed(2).replace('.', ',')
          : price.toFixed(2).replace('.', ',')
      }`}
    </span>
  )
}
