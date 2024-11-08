import { getDigitalMenus } from '@/actions/DigitalMenuActions'
import { DigitalMenuTable } from '@/components/admin/DigitalMenuTable'

export default async function MenuAllPage() {
  const digitalMenus = await getDigitalMenus()

  return <DigitalMenuTable digitalMenu={digitalMenus} />
}
