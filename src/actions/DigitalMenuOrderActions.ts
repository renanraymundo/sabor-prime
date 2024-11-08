'use server'

import { Order, OrderItem, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export type CreateOrderSchema = {
  protocolNumber: string
  name: string
  address: string
  complement?: string
  whatsapp: string
  city: string
  state: string
  items: OrderItem[]
}

export async function createOrder(
  orderData: CreateOrderSchema,
): Promise<Order> {
  try {
    const order = await prisma.order.create({
      data: {
        protocolNumber: orderData.protocolNumber,
        name: orderData.name,
        address: orderData.address,
        complement: orderData.complement,
        whatsapp: orderData.whatsapp,
        city: orderData.city,
        state: orderData.state,
        items: {
          create: orderData.items.map((item) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice,
          })),
        },
      },
    })
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
