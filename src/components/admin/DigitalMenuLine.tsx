import { getLineById } from '@/actions/DigitalMenuLineActions'

type DigitalMenuLineProps = {
  lineId: string | null
}

export async function DigitalMenuLine({
  lineId,
}: DigitalMenuLineProps): Promise<string | null> {
  const line = await getLineById(lineId as string)

  if (!line) return null

  return line.title
}
