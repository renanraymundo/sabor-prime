import { getLines } from '@/actions/DigitalMenuLineActions'
import { DigitalMenuLinesTable } from '@/components/admin/DigitalMenuLinesTable'

export const dynamic = 'force-dynamic'

export default async function MenuAllPage() {
  const lines = await getLines()

  return <DigitalMenuLinesTable lines={lines} />
}
