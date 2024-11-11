import { notFound } from 'next/navigation'

import { getDigitalMenuById } from '@/actions/DigitalMenuActions'
import { DigitalMenuEditForm } from '@/components/admin/DigitalMenuEditForm'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const line = await getDigitalMenuById(params.id)

  const title = line?.title.charAt(0).toUpperCase().concat(line.title.slice(1))

  if (!line) return

  return {
    title: `${title} - Dashboard | Sabor Prime`,
  }
}

export default async function DigitalMenuItemPage({
  params,
}: {
  params: { id: string }
}) {
  const digitalMenu = await getDigitalMenuById(params.id)

  if (!digitalMenu) return notFound()

  return <DigitalMenuEditForm digitalMenu={digitalMenu} />
}
