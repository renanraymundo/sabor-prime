import { getDigitalMenuById } from '@/actions/DigitalMenuActions'
import { transporter } from '@/lib/nodemailer'

export async function sendOrderEmail(
  email: string,
  to: string,
  owner: boolean,
  protocolNumber: string,
  name: string,
  whatsApp: string,
  address: string,
  city: string,
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
      return `<strong>Item:</strong> ${itemTitle}<br/><strong>Quantidade:</strong> ${item.quantity} ${item.quantity > 1 ? 'unidades' : 'unidade'}<br/><strong>Valor total:</strong> R$ ${totalPrice?.toFixed(2).replace('.', ',')}<br/>${countItems}`
    }),
  )

  const finalOutput = itemsList.join('<br/>')

  const body = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body style="font-family: Arial, sans-serif">
      ${
        owner
          ? `<strong>NOVO KIT SOLICITADO:</strong><br/><br/>

      <strong>Protocolo de atendimento:</strong> ${protocolNumber}<br />
      <strong>Nome:</strong> ${name}<br />
      <strong>E-mail:</strong> ${to}<br />
      <strong>WhatsApp:</strong> ${whatsApp}<br />
      <strong>Endereço:</strong> ${address}<br />
      <strong>Cidade:</strong> ${city}/SP<br /><br />

      <strong>PEDIDO DO CLIENTE:</strong><br /><br />
      ${finalOutput}<br/><br/>

      <strong>SUBTOTAL:</strong> R$ ${subTotalPriceSum
        ?.toFixed(2)
        .replace('.', ',')} `
          : `
          
          <strong>OBRIGADO! SEU KIT FOI SOLICITADO.</strong><br /><br />
          <strong>Protocolo de atendimento:</strong> ${protocolNumber}<br/><br/>
          <strong>SEU PEDIDO:</strong><br/><br/>${finalOutput}<br/><br/>
          <strong>SUBTOTAL:</strong> R$ ${subTotalPriceSum?.toFixed(2).replace('.', ',')}
          
          `
      }
    </body>
    </html>`

  await transporter.sendMail({
    from: owner
      ? `${name} <${email}>`
      : `Sabor Prime <${process.env.NEXT_PUBLIC_ADMIN_EMAIL_FULL}>`,
    to: email,
    subject: 'Sabor Prime',
    html: body,
  })
}
