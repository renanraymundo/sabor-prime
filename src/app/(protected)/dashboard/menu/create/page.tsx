import { Metadata } from 'next'

import { DigitalMenuCreateForm } from '@/components/admin/DigitalMenuCreateForm'

export const metadata: Metadata = {
  title: 'Adicionar novo - Dashboard | Sabor Prime',
}

export const dynamic = 'force-dynamic'

export default function DigitalMenuCreatePage() {
  return <DigitalMenuCreateForm />
}
