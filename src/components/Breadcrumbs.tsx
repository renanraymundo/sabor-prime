'use client'

import { DigitalMenu, Line } from '@prisma/client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import { getDigitalMenuById } from '@/actions/DigitalMenuActions'
import { getLineById } from '@/actions/DigitalMenuLineActions'

interface BreadcrumbProps {
  paths: { path: string; name: string | undefined }[]
}

interface PathnameProps {
  pathname: string
  id: string
}

export function Breadcrumb({ pathname, id }: PathnameProps) {
  const [isDigitalMenu, setIsDigitalMenu] = useState<DigitalMenu | null>(null)
  const [isLine, setIsLine] = useState<Line | null>()

  useEffect(() => {
    const fetchDigitalMenu = async () => {
      const fetchedDigitalMenu = await getDigitalMenuById(id)
      setIsDigitalMenu(fetchedDigitalMenu)
    }

    fetchDigitalMenu()

    const fetchLine = async () => {
      const fetchedLine = await getLineById(id)
      setIsLine(fetchedLine)
    }

    fetchLine()
  }, [id])

  const items: BreadcrumbProps[] = [
    {
      paths: [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/dashboard/menu', name: 'Cardápio Digital' },
        { path: '/dashboard/menu/items', name: 'Todos os Itens' },
        { path: '/dashboard/menu/create', name: 'Adicionar novo' },
        { path: `/dashboard/menu/${id}`, name: isDigitalMenu?.title },
        { path: '/dashboard/lines', name: 'Linhas' },
        { path: '/dashboard/lines/items', name: 'Todas as linhas' },
        { path: '/dashboard/lines/create', name: 'Adicionar nova' },
        { path: `/dashboard/lines/${id}`, name: isLine?.title },
        { path: '/dashboard/orders', name: 'Pedidos' },
      ],
    },
  ]

  const getBreadcrumbItems = (items: BreadcrumbProps[], pathname: string) => {
    return items
      .flatMap((item) => item.paths)
      .filter((item) => pathname.startsWith(item.path))
      .map((item, index, array) => {
        const isLastItem = index === array.length - 1

        return (
          <div key={item.path} className="flex items-center gap-1">
            <Link
              href={item.path}
              className={isLastItem ? 'text-secondary' : ''}
            >
              {item.name}
            </Link>
            {isLastItem || <FiChevronRight />}
          </div>
        )
      })
  }

  const breadcrumbItems = getBreadcrumbItems(items, pathname)

  return (
    <div className="flex items-center gap-2">
      {breadcrumbItems.length > 0 ? breadcrumbItems : <span>Padrão</span>}
    </div>
  )
}
