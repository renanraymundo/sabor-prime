import { getDigitalMenuById } from '@/actions/DigitalMenuActions'

export async function ultraMessage(
  owner: boolean,
  protocolNumber: string,
  to: string,
  name: string,
  whatsApp: string,
  items: Array<{
    id: string
    quantity: number
    price: number
    totalPrice: number
  }>,
) {
  let subTotalPriceSum = 0

  const maxTitleLength = Math.max(
    ...(await Promise.all(
      items.map(async (item) => {
        const digitalMenu = await getDigitalMenuById(item.id)
        return (digitalMenu?.title || 'Título não encontrado').length
      }),
    )),
  )

  const itemsList = await Promise.all(
    items.map(async (item, index) => {
      const digitalMenu = await getDigitalMenuById(item.id)
      const itemTitle = digitalMenu?.title || 'Título não encontrado'
      const totalPrice = item.totalPrice
      subTotalPriceSum += totalPrice

      const dividerLine = ''.padEnd(maxTitleLength, '-')

      const countItems =
        items.length > 1 && index < items.length - 1 ? `${dividerLine}` : ''
      return `*Item:* ${itemTitle}\n*Quantidade:* ${item.quantity} ${item.quantity > 1 ? 'unidades' : 'unidade'}\n*Valor total:* R$ ${totalPrice?.toFixed(2).replace('.', ',')}\n${countItems}`
    }),
  )

  const finalOutput = itemsList.join('\n')

  const response = await fetch(
    `https://api.ultramsg.com/${process.env.WHATSAPP_MESSAGE_INSTANCE_ID}/messages/chat`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: process.env.WHATSAPP_TOKEN,
        to,
        body: owner
          ? `*NOVO KIT SOLICITADO:*\n\n*Protocolo de atendimento:* ${protocolNumber}\n*Nome do cliente:* ${name}\n*WhatsApp do cliente:* ${whatsApp}\n\n*PEDIDO DO CLIENTE:*\n\n${finalOutput}\n*~SUBTOTAL:~* R$ ${subTotalPriceSum?.toFixed(2).replace('.', ',')}`
          : `*OBRIGADO! SEU KIT FOI SOLICITADO.*\n\n*Protocolo de atendimento:* ${protocolNumber}\n\n*SEU PEDIDO:*\n\n${finalOutput}\n*~SUBTOTAL:~* R$ ${subTotalPriceSum?.toFixed(2).replace('.', ',')}`,
      }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong')
  }
}
