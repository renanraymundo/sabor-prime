'use server'

import { Order, OrderItem, OrderStatus, Prisma } from '@prisma/client'

import { OrdersWithItems } from '@/components/admin/DigitalMenuOrderItemsTable'
import { prisma } from '@/lib/prisma'
import { createDigitalMenuOrderSchema } from '@/schemas/DigitalMenuOrderSchema'
import { sendOrderEmail } from '@/services/mail'

import { ActionResult } from '.'

export type CreateOrderProps = {
  protocolNumber: string
  name: string
  email: string
  address: string
  complement?: string
  whatsapp: string
  city: string
  state: string
  items: OrderItem[]
}

export async function createOrder(orderData: CreateOrderProps): Promise<Order> {
  try {
    const validated = createDigitalMenuOrderSchema.safeParse(orderData)

    if (!validated.success) {
      throw new Error('Invalid data')
    }

    const {
      protocolNumber,
      name,
      email,
      address,
      city,
      state,
      complement,
      whatsapp,
      items,
    } = orderData

    const order = await prisma.order.create({
      data: {
        protocolNumber,
        name,
        email,
        address,
        complement,
        whatsapp,
        city,
        state,
        items: {
          create: orderData.items.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            digitalMenuId: item.digitalMenuId,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    const to = email

    await sendOrderEmail(
      'saborprimecps@gmail.com',
      to,
      true,
      protocolNumber,
      name,
      whatsapp,
      address,
      city,
      items,
    )

    await sendOrderEmail(
      email,
      to,
      false,
      protocolNumber,
      name,
      whatsapp,
      address,
      city,
      items,
    )
    return order
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany()
    return orders
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function getOrderById(
  id: string,
): Promise<Prisma.OrderGetPayload<{ include: { items: true } }> | null> {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    })

    if (!order) return null

    return order
  } catch (error) {
    console.log(error)

    throw Error
  }
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  order: OrdersWithItems,
): Promise<ActionResult<string>> {
  try {
    order?.items.map(async (item) => {
      const digitalMenu = await prisma.digitalMenu.findUnique({
        where: { id: item.digitalMenuId },
      })

      if (!digitalMenu) {
        throw new Error(`Product with id ${item.digitalMenuId} not found`)
      }

      const updatedQuantity = digitalMenu.quantity - item.quantity

      if (updatedQuantity < 0) {
        throw new Error(`Not enough quantity for product ${item.id}`)
      }

      if (status === 'COMPLETED') {
        await prisma.digitalMenu.update({
          where: { id: item.digitalMenuId },
          data: { quantity: updatedQuantity, stock: updatedQuantity },
        })
      }
    })

    await prisma.order.update({
      where: { id },
      data: { status },
    })

    return { status: 'success', data: 'Quantidade atualizada com sucesso' }
  } catch (error) {
    console.log(error)
    throw error
  }
}
