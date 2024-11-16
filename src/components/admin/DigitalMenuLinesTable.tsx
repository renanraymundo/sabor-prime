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
import { Line } from '@prisma/client'
import Link from 'next/link'
import { FiEdit } from 'react-icons/fi'

import { DigitalMenuLineDelete } from './DigitalMenLineDelete'

type DigitalMenuLinesTableProps = {
  lines: Line[]
}
export function DigitalMenuLinesTable({ lines }: DigitalMenuLinesTableProps) {
  return (
    <Table
      aria-label="Tabla de items"
      classNames={{
        th: 'bg-primary text-white font-bold text-base border-white border',
      }}
    >
      <TableHeader>
        <TableColumn>Título</TableColumn>
        <TableColumn>Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {lines.map((line) => (
          <TableRow key={line.id}>
            <TableCell className="font-semibold">{line.title}</TableCell>

            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip
                  color="success"
                  content="Editar linha"
                  className="text-white"
                >
                  <Link href={line.id}>
                    <FiEdit size={16} className="text-success" />
                  </Link>
                </Tooltip>
                <DigitalMenuLineDelete id={line.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
