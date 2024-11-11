import { notFound } from 'next/navigation'

import { getLineById } from '@/actions/DigitalMenuLineActions'
import { DigitalMenuLineEditForm } from '@/components/admin/DigitalMenuLineEditForm'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const line = await getLineById(params.id)

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
  const line = await getLineById(params.id)

  if (!line) return notFound()

  return <DigitalMenuLineEditForm line={line} />
}
