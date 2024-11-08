import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { IconType } from 'react-icons'

type BoxProps = {
  title: string
  icon: IconType
  quantity: number
}

export function BoxWrapper({ title, icon: Icon, quantity }: BoxProps) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between text-xl text-primary">
        {title}
        <Icon size={26} className="text-secondary" />
      </CardHeader>
      <CardBody className="text-3xl text-slate-500">{quantity}</CardBody>
    </Card>
  )
}
