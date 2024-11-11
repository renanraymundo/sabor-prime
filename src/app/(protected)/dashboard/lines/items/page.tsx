import { Metadata } from 'next'

import { getLines } from '@/actions/DigitalMenuLineActions'
import { DigitalMenuLinesTable } from '@/components/admin/DigitalMenuLinesTable'

export const metadata: Metadata = {
  title: 'Todas as linhas  - Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'

export default async function MenuAllPage() {
  const lines = await getLines()

  return <DigitalMenuLinesTable lines={lines} />
}
