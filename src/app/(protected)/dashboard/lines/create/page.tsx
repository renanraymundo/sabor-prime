import { Metadata } from 'next'

import { DigitalMenuLineCreateForm } from '@/components/admin/DigitalMenuLineCreateForm'

export const metadata: Metadata = {
  title: 'Adicionar nova - Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'
export default function DigitalMenuCreatePage() {
  return <DigitalMenuLineCreateForm />
}
