import { getLines } from '@/actions/DigitalMenuLineActions'
import { DigitalMenuLinesTable } from '@/components/admin/DigitalMenuLinesTable'

export default async function LinesPage() {
  const lines = await getLines()

  return <DigitalMenuLinesTable lines={lines} />
}
