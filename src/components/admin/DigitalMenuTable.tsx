'use client'

import {
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { DigitalMenu } from '@prisma/client'
import { useEffect, useState } from 'react'
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
        <TableColumn>Linha</TableColumn>
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
            <TableCell>{lineData[item.lineId || '']?.title || ''}</TableCell>
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
