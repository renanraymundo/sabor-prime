import { Metadata } from 'next'
import { IconType } from 'react-icons'
import { FiBook } from 'react-icons/fi'
import { MdOutlineCategory, MdOutlineRestaurantMenu } from 'react-icons/md'

import { getDigitalMenus } from '@/actions/DigitalMenuActions'
import { getLines } from '@/actions/DigitalMenuLineActions'
import { getOrders } from '@/actions/DigitalMenuOrderActions'
import { BoxWrapper } from '@/components/admin/BoxWrapper'

type DashboardPageItemProps = {
  id: string
  icon: IconType
  title: string
  quantity: number
}

export const metadata: Metadata = {
  title: 'Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const digitalMenus = await getDigitalMenus()
  const orders = await getOrders()
  const categories = await getLines()

  const items: DashboardPageItemProps[] = [
    {
      id: '0',
      icon: MdOutlineRestaurantMenu,
      title: 'Cardápio Digital',
      quantity: digitalMenus.length,
    },
    {
      id: '1',
      icon: MdOutlineCategory,
      title: 'Linhas',
      quantity: categories.length,
    },
    {
      id: '2',
      icon: FiBook,
      title: 'Pedidos',
      quantity: orders.length,
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <BoxWrapper
          key={item.id}
          title={item.title}
          quantity={item.quantity}
          icon={item.icon}
        />
      ))}
    </div>
  )
}
