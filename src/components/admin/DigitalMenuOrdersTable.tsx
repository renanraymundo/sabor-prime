'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { Order } from '@prisma/client'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'

import { DigitalMenuOrderDelete } from './DigitalMenuOrderDelete'
import { DigitalMenuOrderStatus } from './DIgitalMenuOrderStatus'

type DigitalMenuOrdersTableProps = {
  orders: Order[]
}
export function DigitalMenuOrdersTable({
  orders,
}: DigitalMenuOrdersTableProps) {
  return (
    <Table
      aria-label="Tabla de pedidos"
      classNames={{
        th: 'bg-primary text-white font-bold text-base border-white border',
      }}
    >
      <TableHeader>
        <TableColumn>Protocolo</TableColumn>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.protocolNumber}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>
              <DigitalMenuOrderStatus status={order.status} />
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip
                  color="success"
                  content="Editar item"
                  className="text-white"
                >
                  <Link href={`orders/${order.id}`}>
                    <FiEdit size={16} className="text-success" />
                  </Link>
                </Tooltip>
                <DigitalMenuOrderDelete id={order.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
