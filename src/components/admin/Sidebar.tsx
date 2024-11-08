'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { IconType } from 'react-icons'
import { FiBook } from 'react-icons/fi'
import { MdOutlineCategory, MdOutlineRestaurantMenu } from 'react-icons/md'
import { RiDashboard3Line } from 'react-icons/ri'

import { Logo } from '@/components/Logo'

import { SidebarItem } from './SidebarItem'

export type subItemsProps = {
  id: string
  name: string
  path: string
}

type SidebarProps = {
  id: string
  icon: IconType
  name: string
  path: string
  items: subItemsProps[]
}

export function Sidebar() {
  const pathname = usePathname()

  const items: SidebarProps[] = [
    {
      id: '0',
      icon: RiDashboard3Line,
      name: 'Dashboard',
      path: '/dashboard',
      items: [],
    },
    {
      id: '1',
      icon: MdOutlineRestaurantMenu,
      name: 'Cardápio Digital',
      path: '',
      items: [
        {
          id: '0',
          name: 'Todos os itens',
          path: '/dashboard/menu/itens',
        },
        {
          id: '1',
          name: 'adicionar novo',
          path: '/dashboard/menu/create',
        },
      ],
    },
    {
      id: '2',
      icon: MdOutlineCategory,
      name: 'Linhas',
      path: '',
      items: [
        {
          id: '0',
          name: 'Todas as linhas',
          path: '/dashboard/lines',
        },
        {
          id: '1',
          name: 'adicionar nova',
          path: '/dashboard/lines/create',
        },
      ],
    },
    {
      id: '3',
      icon: FiBook,
      name: 'Pedidos',
      path: '/dashboard/orders',
      items: [],
    },
  ]

  return (
    <Card
      className="w-72"
      classNames={{
        base: 'rounded-none h-screen',
      }}
    >
      <CardHeader className="justify-center">
        <Logo />
      </CardHeader>
      <CardBody as="nav" className="mt-6 space-y-4">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            name={item.name}
            path={item.path}
            items={item.items}
            pathname={pathname}
          />
        ))}
      </CardBody>
    </Card>
  )
}
