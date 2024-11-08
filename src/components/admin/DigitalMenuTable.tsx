'use client'

import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { DigitalMenu } from '@prisma/client'
import Link from 'next/link'
import { FiEdit, FiTrash } from 'react-icons/fi'

import { DigitalMenuPriceTable } from './DigitalMenuPriceTable'
import { DigitalMenuStatus } from './DIgitalMenuStatus'

type DigitalMenuTableProps = {
  digitalMenu: DigitalMenu[]
}
export function DigitalMenuTable({ digitalMenu }: DigitalMenuTableProps) {
  return (
    <Table
      aria-label="Tabla de items"
      classNames={{
        th: 'bg-primary text-white font-normal text-base border-white border',
      }}
    >
      <TableHeader>
        <TableColumn>Foto</TableColumn>
        <TableColumn>Título</TableColumn>
        <TableColumn>Preço unitário</TableColumn>
        <TableColumn>Quantidade</TableColumn>
        <TableColumn>Calorias</TableColumn>
        <TableColumn>Estoque</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {digitalMenu.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Image
                src={item.photo}
                alt="Foto da marmita"
                className="h-10 w-10 rounded-full border border-slate-400 object-cover"
              />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <DigitalMenuPriceTable price={item.price} />
            </TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.calories}</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell>
              <DigitalMenuStatus status={item.status} />
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip
                  color="success"
                  content="Editar item"
                  className="text-white"
                >
                  <Link href={item.id}>
                    <FiEdit size={16} className="text-success" />
                  </Link>
                </Tooltip>
                <Tooltip color="danger" content="Deletar item">
                  <span className="cursor-pointer text-lg text-danger active:opacity-50">
                    <FiTrash />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
