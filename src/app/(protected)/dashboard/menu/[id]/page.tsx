import { notFound } from 'next/navigation'

import { getDigitalMenuById } from '@/actions/DigitalMenuActions'
import { DigitalMenuEditForm } from '@/components/admin/DigitalMenuEditForm'

export default async function DigitalMenuItemPage({
  params,
}: {
  params: { id: string }
}) {
  const digitalMenu = await getDigitalMenuById(params.id)

  if (!digitalMenu) return notFound()

  return <DigitalMenuEditForm digitalMenu={digitalMenu} />
}
