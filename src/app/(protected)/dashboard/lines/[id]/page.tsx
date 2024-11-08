import { notFound } from 'next/navigation'

import { getLineById } from '@/actions/DigitalMenuLineActions'
import { DigitalMenuLineEditForm } from '@/components/admin/DigitalMenuLineEditForm'

export default async function DigitalMenuItemPage({
  params,
}: {
  params: { id: string }
}) {
  const line = await getLineById(params.id)

  if (!line) return notFound()

  return <DigitalMenuLineEditForm line={line} />
}
