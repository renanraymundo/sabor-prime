import { Chip } from '@nextui-org/react'

type DigitalMenuOrderStatusType = 'CANCELLED' | 'INPROCESS' | 'COMPLETED'

type DigitalMenuOrderStatusProps = {
  status: DigitalMenuOrderStatusType
}

const digitalMenuOrderStatusMap: Record<DigitalMenuOrderStatusType, string> = {
  CANCELLED: 'Cancelado',
  INPROCESS: 'Em andamento',
  COMPLETED: 'Finalizado',
}

export function DigitalMenuOrderStatus({
  status,
}: DigitalMenuOrderStatusProps) {
  let setStatus = ''

  switch (status) {
    case 'CANCELLED':
      setStatus = 'danger'
      break

    case 'COMPLETED':
      setStatus = 'success'
      break

    default:
      setStatus = 'warning'
      break
  }

  return (
    <div className="flex items-center gap-2">
      <Chip
        className="capitalize"
        color={setStatus as 'danger' | 'success' | 'warning'}
        size="sm"
        variant="flat"
        as="div"
      >
        <span className="!h-4">
          {digitalMenuOrderStatusMap[status as DigitalMenuOrderStatusType] ||
            status}
        </span>
      </Chip>
    </div>
  )
}
