'use server'

import { DigitalMenu } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import {
  DigitalMenuSchema,
  digitalMenuSchema,
} from '@/schemas/DigitalMenuSchema'

import { ActionResult } from '.'
import { getAuthUserId } from './authActions'

type MenuItem = {
  id: string
  photo: string
  title: string
  price: number
}

export async function createDigitalMenu(
  data: DigitalMenuSchema,
): Promise<ActionResult<{ status: string; id?: string }>> {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    const validated = digitalMenuSchema.safeParse(data)

    if (!validated.success)
      return { status: 'error', error: validated.error.errors }

    const {
      title,
      description,
      photo,
      price,
      calories,
      quantity,
      status,
      stock,
      lineId,
    } = validated.data

    const digitalMenu = await prisma.digitalMenu.create({
      data: {
        userId,
        photo,
        title,
        description,
        price,
        calories,
        quantity,
        status,
        stock,
        lineId,
      },
    })

    return {
      status: 'success',
      data: { status: 'success', id: digitalMenu.id },
    }
  } catch (error) {
    console.error('Erro ao criar o menu digital:', error)
    return { status: 'error', error: 'Falha ao criar o menu digital' }
  }
}

export async function updateDigitalMenu(
  id: string,
  data: DigitalMenuSchema,
): Promise<ActionResult<DigitalMenu>> {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    const validated = digitalMenuSchema.safeParse(data)

    if (!validated.success)
      return { status: 'error', error: validated.error.errors }

    const {
      title,
      description,
      photo,
      price,
      calories,
      quantity,
      status,
      stock,
      lineId,
    } = validated.data

    const digitalMenu = await prisma.digitalMenu.update({
      where: {
        id,
      },
      data: {
        userId,
        photo,
        title,
        description,
        price,
        calories,
        quantity,
        status,
        stock,
        lineId,
      },
    })

    return {
      status: 'success',
      data: digitalMenu,
    }
  } catch (error) {
    console.error('Erro ao criar o menu digital:', error)
    return { status: 'error', error: 'Falha ao criar o menu digital' }
  }
}

export async function deleteDigitalMenu(id: string) {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    await prisma.digitalMenu.delete({
      where: { id },
    })

    return { status: 'success', data: 'Deleted' }
  } catch (error) {
    console.error('Erro ao deletar o menu digital:', error)
    return { status: 'error', error: 'Falha ao deletar o menu digital' }
  }
}

export async function getDigitalMenusByIds(
  digitalMenuIds: string[],
): Promise<Record<string, { photo: string; title: string; price: number }>> {
  try {
    const digitalMenus = await prisma.digitalMenu.findMany({
      where: {
        id: { in: digitalMenuIds },
      },
      select: {
        id: true,
        photo: true,
        title: true,
        price: true,
      },
    })

    return digitalMenus.reduce(
      (
        acc: Record<string, { photo: string; title: string; price: number }>,
        menu: MenuItem,
      ) => {
        acc[menu.id] = {
          photo: menu.photo,
          title: menu.title,
          price: menu.price,
        }
        return acc
      },
      {} as Record<string, { photo: string; title: string; price: number }>,
    )
  } catch (error) {
    console.error('Error fetching digital menus:', error)
    throw error
  }
}

export async function getDigitalMenuById(id: string) {
  try {
    if (!id) return null

    const digitalMenu = await prisma.digitalMenu.findUnique({
      where: { id },
    })

    return digitalMenu
  } catch (error) {
    console.log(error)

    throw Error
  }
}

export async function getDigitalMenus() {
  try {
    const digitalMenus = await prisma.digitalMenu.findMany()
    return digitalMenus
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function deleteOrder(id: string) {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    await prisma.orderItem.deleteMany({
      where: { orderId: id },
    })

    await prisma.order.delete({
      where: { id },
    })

    return { status: 'success', data: 'Deleted' }
  } catch (error) {
    console.error('Erro ao deletar o pedido:', error)
    return { status: 'error', error: 'Falha ao deletar o pedido' }
  }
}
