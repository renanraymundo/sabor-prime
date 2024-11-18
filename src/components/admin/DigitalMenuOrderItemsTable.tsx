'use client'

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import { getOrderById } from '@/actions/DigitalMenuOrderActions'

import { DigitalMenuOrderStatusForm } from './DigitalMenuOrderStatusForm'

type OrdersWithItems = Awaited<ReturnType<typeof getOrderById>>

type DigitalMenuOrderItemsTableProps = {
  order: OrdersWithItems
}

export function DigitalMenuOrderItemsTable({
  order,
}: DigitalMenuOrderItemsTableProps) {
  if (!order) return

  const subTotal = order.items
    .reduce((acc, item) => acc + item.totalPrice, 0)
    .toFixed(2)
    .replace('.', ',')

  return (
    <Card>
      <CardHeader className="flex items-center justify-between pb-0 text-base font-bold text-slate-600">
        Pedido
        <DigitalMenuOrderStatusForm status={order.status} />
      </CardHeader>
      <CardBody>
        <Table
          aria-label="Tabla de pedidos"
          classNames={{
            th: 'bg-primary text-white font-semibold text-base border-white border-r',
            td: 'text-slate-500 text-sm [&:last-child]:text-primary',
            wrapper: ' shadow-none bg-slate-50',
          }}
        >
          <TableHeader>
            <TableColumn>Item</TableColumn>
            <TableColumn>Preço unitário</TableColumn>
            <TableColumn>Quantidade</TableColumn>
            <TableColumn>Valor total</TableColumn>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <p className="mt-2 text-end text-base text-slate-500">
          SubTotal:&nbsp;
          <span className="text-2xl font-bold text-secondary">
            R$ {subTotal}
          </span>
        </p>
      </CardBody>
    </Card>
  )
}
