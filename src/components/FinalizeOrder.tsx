'use client'

import { Button, Link } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { BiLike } from 'react-icons/bi'
import { MdOutlineDoNotDisturbAlt } from 'react-icons/md'

import { useCart } from '@/providers/CartProvider'

export function FinalizeOrder() {
  const { productsCart } = useCart()
  const [isOrderDisabled, setIsOrderDisabled] = useState<boolean>(true)

  const enabledTotalPrice = productsCart
    .map((item) => item.totalPrice)
    .reduce((acc, curr) => acc + curr, 0)

  useEffect(() => {
    const kitItems = productsCart.some(
      (item) => item.line === 'Kits e Promoções',
    )
    setIsOrderDisabled(!kitItems && enabledTotalPrice <= 90.0)
  }, [productsCart, enabledTotalPrice])

  return (
    <>
      <div className="mt-4 flex w-full flex-col items-center space-y-2 text-center">
        <p className="text-sm font-semibold text-danger">
          *Para prosseguir com o pedido, é necessário que a compra tenha um
          valor mínimo de R$90,00.
          <br />
          Válido enquanto durar o estoque.
        </p>
        <Button
          as={isOrderDisabled ? undefined : Link}
          href="/checkout"
          color="secondary"
          size="md"
          disabled={isOrderDisabled}
          className="flex items-center justify-center gap-1 font-semibold leading-normal disabled:cursor-not-allowed disabled:bg-opacity-60"
        >
          Fechar Pedido
          {isOrderDisabled ? (
            <MdOutlineDoNotDisturbAlt size={18} />
          ) : (
            <BiLike size={18} />
          )}
        </Button>
      </div>
    </>
  )
}
