'use client'

import { useCart } from '@/providers/CartProvider'

type DigitalMenuQuantityInputProps = {
  id: string
  title: string
  stock: number
  price: number
}

export function DigitalMenuQuantityInput({
  id,
  stock,
  price,
  title,
}: DigitalMenuQuantityInputProps) {
  const { addProductToCart, removeProductToCart, productsCart } = useCart()

  console.log('Item:', title)

  return (
    <>
      <span className="font-semibold text-slate-500">Qtde</span>
      <div className="flex items-center justify-center gap-2 rounded-large border-2 border-slate-100 px-3 py-1">
        <button
          className="font-mono text-xl font-bold text-slate-500"
          onClick={() => removeProductToCart(id, price)}
        >
          -
        </button>
        <input
          className="flex h-6 w-6 items-center justify-center rounded-lg text-center text-base font-semibold text-primary"
          type="text"
          value={productsCart.find((item) => item.id === id)?.quantity || 0}
          readOnly
        />
        <button
          className="font-mono text-xl font-bold text-slate-500"
          onClick={() => addProductToCart(id, title, stock, price)}
        >
          +
        </button>
      </div>
    </>
  )
}
