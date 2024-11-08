'use client'

import { Card, CardBody } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { DigitalMenuFormOrders } from '@/components/DigitalMenuFormOrders'
import { DigitalMenuOrders } from '@/components/home/DigitalMenuOrders'
import { useCart } from '@/providers/CartProvider'

export default function CheckoutPage() {
  const { productsCart } = useCart()
  const router = useRouter()

  const quantityItems = productsCart.map((item) => item.quantity)
  const countItems = quantityItems.reduce(
    (acc, actualValue) => acc + actualValue,
    0,
  )

  useEffect(() => {
    if (countItems < 6) router.push('/')
  }, [countItems, router])

  return (
    <section className="w-full py-8">
      <div className="theme-container space-y-6">
        <h1 className="relative mx-auto flex max-w-max items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary-100 px-8 py-2 text-white before:h-2 before:w-2 before:rounded-full before:bg-white after:h-2 after:w-2 after:rounded-full after:bg-white max-xs:text-3xl xs:text-4xl">
          Finalizar Pedido
        </h1>
        <Card>
          <CardBody className="grid gap-4 lg:grid-cols-[26rem_1fr]">
            <div className="space-y-2 max-lg:order-1">
              <h2 className="text-xl leading-5 text-slate-500">
                Preencha as informações abaixo para finalizar seu pedido
              </h2>
              <DigitalMenuFormOrders />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl leading-5 text-slate-500">Seu Pedido</h2>
              <DigitalMenuOrders />
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
