import { getOrders } from '@/actions/DigitalMenuOrderActions'
import { DigitalMenuOrdersTable } from '@/components/admin/DigitalMenuOrdersTable'

export default async function OrdersPage() {
  const orders = await getOrders()

  return <DigitalMenuOrdersTable orders={orders} />
}
