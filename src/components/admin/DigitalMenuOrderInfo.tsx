import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Order } from '@prisma/client'

type DigitalMenuOrderInfoProps = {
  order: Order
}
export function DigitalMenuOrderInfo({ order }: DigitalMenuOrderInfoProps) {
  return (
    <Card>
      <CardHeader className="text-xl text-slate-600">Informações</CardHeader>
      <CardBody as="ul">
        <li className="text-slate-500">
          <span className="text-primary">Protocolo: </span>
          {order.protocolNumber}
        </li>
        <li className="text-slate-500">
          <span className="text-primary">Nome: </span>
          {order.name}
        </li>
        <li className="text-slate-500">
          <span className="text-primary">WhatsApp: </span>
          {order.whatsapp}
        </li>
        <li className="text-slate-500">
          <span className="text-primary">Endereço: </span>
          {order.address}
        </li>
        {order.complement && (
          <li className="text-slate-500">
            <span className="text-primary">Complemento: </span>
            {order.complement}
          </li>
        )}
        <li className="text-slate-500">
          <span className="text-primary">Cidade: </span>
          {order.city}/SP
        </li>
      </CardBody>
    </Card>
  )
}
