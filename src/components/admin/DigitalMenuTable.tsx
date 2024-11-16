'use client'

import {
  Image,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { DigitalMenu } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import { getLineById } from '@/actions/DigitalMenuLineActions'

import { DigitalMenuDelete } from './DigitalMenuDelete'
import { DigitalMenuPriceTable } from './DigitalMenuPriceTable'
import { DigitalMenuStatus } from './DIgitalMenuStatus'

type DigitalMenuTableProps = {
  digitalMenu: DigitalMenu[]
}

type LineProps = {
  id: string
  title: string
}
export function DigitalMenuTable({ digitalMenu }: DigitalMenuTableProps) {
  const [lineData, setLineData] = useState<{
    [key: string]: LineProps | undefined
  }>({})

  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 8

  useEffect(() => {
    const fetchLineData = async () => {
      const data: { [key: string]: LineProps | undefined } = {}
      for (const item of digitalMenu) {
        if (item.lineId) {
          const line = await getLineById(item.lineId)
          if (line) data[item.lineId] = line
        }
      }
      setLineData(data)
    }

    fetchLineData()
  }, [digitalMenu])

  const pages = Math.ceil(digitalMenu.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return digitalMenu.slice(start, end)
  }, [page, digitalMenu])

  return (
    <Table
      aria-label="Tabla de items"
      classNames={{
        th: 'bg-primary text-white font-normal text-base border-white border',
      }}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader>
        <TableColumn className="font-semibold">Foto</TableColumn>
        <TableColumn className="font-semibold">Título</TableColumn>
        <TableColumn className="font-semibold">Preço unitário</TableColumn>
        <TableColumn className="font-semibold">Quantidade</TableColumn>
        <TableColumn className="font-semibold">Calorias</TableColumn>
        <TableColumn className="font-semibold">Estoque</TableColumn>
        <TableColumn className="font-semibold">Status</TableColumn>
        <TableColumn className="font-semibold">Linha</TableColumn>
        <TableColumn className="font-semibold">Ações</TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <Image
                src={item.photo}
                alt="Foto da marmita"
                className="h-10 w-10 rounded-full border border-slate-400 object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell className="font-medium">
              <DigitalMenuPriceTable price={item.price} />
            </TableCell>
            <TableCell className="font-medium">{item.quantity}</TableCell>
            <TableCell className="font-medium">{item.calories}</TableCell>
            <TableCell className="font-medium">{item.stock}</TableCell>
            <TableCell>
              <DigitalMenuStatus status={item.status} />
            </TableCell>
            <TableCell className="font-medium">
              {lineData[item.lineId || '']?.title || ''}
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

                <DigitalMenuDelete id={item.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
