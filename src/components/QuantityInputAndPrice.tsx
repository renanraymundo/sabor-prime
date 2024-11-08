'use client'

import { useQuantity } from '@/providers/QuantityProvider'

import { DigitalMenuPrice } from './DigitalMenuPrice'

export function QuantityInputAndPrice() {
  const { quantity, totalPrice, increaseQuantity, decreaseQuantity } =
    useQuantity()

  return (
    <ul className="flex items-center justify-between gap-2 max-xs:flex-col xs:flex-row">
      <li className="flex items-center gap-2">
        <span className="text-slate-500">Qtde</span>
        <div className="flex items-center justify-center gap-2 rounded-large border-2 border-slate-100 px-3 py-1">
          <button
            className="font-mono text-xl font-bold text-slate-500"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <input
            className="flex h-8 w-8 items-center justify-center rounded-lg text-center text-2xl text-primary"
            type="text"
            value={quantity}
            readOnly
          />
          <button
            className="font-mono text-xl font-bold text-slate-500"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </li>

      <li>
        <DigitalMenuPrice size="md" price={totalPrice} />
      </li>
    </ul>
  )
}
