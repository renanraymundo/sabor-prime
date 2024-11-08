import { Chip } from '@nextui-org/react'

type DigitalMenuStatusType = 'ACTIVATED' | 'DEACTIVATED'

type DigitalMenuStatusProps = {
  status: DigitalMenuStatusType
}

const digitalMenuStatusMap: Record<DigitalMenuStatusType, string> = {
  ACTIVATED: 'Ativado',
  DEACTIVATED: 'Desativado',
}

export function DigitalMenuStatus({ status }: DigitalMenuStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <Chip
        className="capitalize"
        color={status === 'ACTIVATED' ? 'success' : 'danger'}
        size="sm"
        variant="flat"
        as="div"
      >
        <span className="!h-4">
          {digitalMenuStatusMap[status as 'ACTIVATED' | 'DEACTIVATED'] ||
            status}
        </span>
      </Chip>
    </div>
  )
}
