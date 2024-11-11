import { Metadata } from 'next'

import { getDigitalMenus } from '@/actions/DigitalMenuActions'
import { DigitalMenuTable } from '@/components/admin/DigitalMenuTable'

export const metadata: Metadata = {
  title: 'Todos os itens - Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'

export default async function MenuAllPage() {
  const digitalMenus = await getDigitalMenus()

  return <DigitalMenuTable digitalMenu={digitalMenus} />
}
