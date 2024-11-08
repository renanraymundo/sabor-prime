import Link from 'next/link'
import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

interface BreadcrumbProps {
  paths: { path: string; name: string }[]
}

interface PathnameProps {
  pathname: string
}

export function Breadcrumb({ pathname }: PathnameProps) {
  const items: BreadcrumbProps[] = [
    {
      paths: [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/dashboard/menu', name: 'Cardápio Digital' },
        { path: '/dashboard/menu/items', name: 'Todos os Itens' },
        { path: '/dashboard/menu/create', name: 'Adicionar novo' },
        { path: '/dashboard/lines', name: 'Linhas' },
        { path: '/dashboard/lines/items', name: 'Todas as linhas' },
        { path: '/dashboard/lines/create', name: 'Adicionar nova' },
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
