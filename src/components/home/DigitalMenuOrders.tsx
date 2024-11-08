'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { getDigitalMenusByIds } from '@/actions/DigitalMenuActions'
import { useCart } from '@/providers/CartProvider'

export function DigitalMenuOrders() {
  const { productsCart } = useCart()

  const [digitalMenuOptions, setDigitalMenuOptions] = useState<Record<
    string,
    { photo: string; title: string; price: number }
  > | null>(null)

  useEffect(() => {
    async function fetchDigitalMenus() {
      const ids = productsCart.map((item) => item.id)
      const options = await getDigitalMenusByIds(ids)
      setDigitalMenuOptions(options)
    }

    fetchDigitalMenus()
  }, [productsCart])

  if (!digitalMenuOptions)
    return <p className="text-slate-500">carregando...</p>

  const subtotal = productsCart.reduce((acc, item) => {
    const unitPrice = digitalMenuOptions[item.id]?.price || 0
    return acc + unitPrice * item.quantity
  }, 0)

  return (
    <div className="space-y-4">
      <Table
        aria-label="Tabela de pedidos do cliente"
        color="primary"
        classNames={{
          th: 'bg-secondary text-white font-normal text-base border-white border',
        }}
      >
        <TableHeader>
          <TableColumn>Kit</TableColumn>
          <TableColumn>Valor unitário</TableColumn>
          <TableColumn>Qtde</TableColumn>
          <TableColumn>Valor total</TableColumn>
        </TableHeader>
        <TableBody>
          {productsCart.map((item) => {
            const title = digitalMenuOptions[item.id]?.title
            const unitPrice = digitalMenuOptions[item.id]?.price || 0
            const totalPrice = unitPrice * item.quantity

            return (
              <TableRow key={item.id}>
                <TableCell className="text-base leading-5 text-slate-500">
                  {title || 'Produto não encontrado'} (320g)
                </TableCell>
                <TableCell className="text-base text-secondary">
                  {`R$ ${unitPrice.toFixed(2).replace('.', ',')}`}
                </TableCell>
                <TableCell className="text-base text-slate-500">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-base text-primary">
                  {`R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <div className="flex flex-col text-end">
        <p className="text-slate-400">Entrega a combinar.</p>
        <p className="text-small leading-4 text-danger">
          * Informamos que não solicitamos pagamentos neste site ou via
          WhatsApp. O pagamento deverá ser realizado no ato da entrega do seu
          kit.
        </p>
        <p className="text-base text-slate-500">
          Subtotal:&nbsp;
          <span className="text-2xl text-primary">
            {`R$ ${subtotal.toFixed(2).replace('.', ',')}`}
          </span>
        </p>
      </div>
    </div>
  )
}
