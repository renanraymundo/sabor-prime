import { Metadata } from 'next'

import { getOrders } from '@/actions/DigitalMenuOrderActions'
import { DigitalMenuOrdersTable } from '@/components/admin/DigitalMenuOrdersTable'

export const metadata: Metadata = {
  title: 'Pedidos - Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const orders = await getOrders()

  return <DigitalMenuOrdersTable orders={orders} />
}
