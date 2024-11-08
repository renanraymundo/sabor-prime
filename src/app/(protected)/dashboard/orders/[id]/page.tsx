import { notFound } from 'next/navigation'

import { getOrderById } from '@/actions/DigitalMenuOrderActions'
import { DigitalMenuOrderInfo } from '@/components/admin/DigitalMenuOrderInfo'
import { DigitalMenuOrderItemsTable } from '@/components/admin/DigitalMenuOrderItemsTable'

export default async function DigitalMenuOrderPage({
  params,
}: {
  params: { id: string }
}) {
  const order = await getOrderById(params.id)

  if (!order) return notFound()

  return (
    <div className="grid grid-cols-[27rem_1fr] gap-4">
      <DigitalMenuOrderInfo order={order} />
      <DigitalMenuOrderItemsTable order={order} />
    </div>
  )
}
