import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Order } from '@prisma/client'

type DigitalMenuOrderInfoProps = {
  order: Order
}
export function DigitalMenuOrderInfo({ order }: DigitalMenuOrderInfoProps) {
  return (
    <Card>
      <CardHeader className="text-base font-bold text-slate-600">
        Informações
      </CardHeader>
      <CardBody as="ul" className="space-y-1 text-sm">
        <li className="text-slate-500">
          <span className="font-semibold text-primary">Protocolo: </span>
          {order.protocolNumber}
        </li>
        <li className="text-slate-500">
          <span className="font-semibold text-primary">Nome: </span>
          {order.name}
        </li>
        <li className="text-slate-500">
          <span className="font-semibold text-primary">E-mail: </span>
          {order.email}
        </li>
        <li className="text-slate-500">
          <span className="font-semibold text-primary">WhatsApp: </span>
          {order.whatsapp}
        </li>
        <li className="text-slate-500">
          <span className="font-semibold text-primary">Endereço: </span>
          {order.address}
        </li>
        {order.complement && (
          <li className="text-slate-500">
            <span className="font-semibold text-primary">Complemento: </span>
            {order.complement}
          </li>
        )}
        <li className="text-slate-500">
          <span className="font-semibold text-primary">Cidade: </span>
          {order.city}/SP
        </li>
      </CardBody>
    </Card>
  )
}
