'use server'

import { Line } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'
import {
  DigitalMenuLineSchema,
  digitalMenuLineSchema,
} from '@/schemas/DigitalMenuLineSchema'

import { ActionResult } from '.'
import { getAuthUserId } from './authActions'

export async function getLines(): Promise<Line[]> {
  try {
    const lines = await prisma.line.findMany()

    return lines
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function getLineById(id: string): Promise<Line | null> {
  try {
    const line = await prisma.line.findUnique({
      where: {
        id,
      },
    })

    if (!line) return null

    return line
  } catch (error) {
    console.log(error)

    throw Error
  }
}

export async function getDigitalMenusByLine(ids: string[]) {
  try {
    if (!ids || ids.length === 0) return []

    const digitalMenusByline = await prisma.digitalMenu.findMany({
      where: {
        lineId: { in: ids },
      },
      select: {
        id: true,
        photo: true,
        title: true,
        description: true,
        quantity: true,
        price: true,
        calories: true,
        stock: true,
        status: true,
        line: {
          select: {
            title: true,
          },
        },
      },
    })

    return digitalMenusByline
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function createLine(
  data: DigitalMenuLineSchema,
): Promise<ActionResult<Line>> {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    const validated = digitalMenuLineSchema.safeParse(data)

    if (!validated.success)
      return { status: 'error', error: validated.error.errors }

    const { title } = validated.data

    const slug = generateSlug(title)

    const existingLine = await prisma.line.findFirst({
      where: { slug },
    })

    if (existingLine) {
      return { status: 'error', error: 'Linha existente' }
    }

    const line = await prisma.line.create({
      data: {
        userId,
        title,
        slug: generateSlug(title),
      },
    })

    return { status: 'success', data: line }
  } catch (error) {
    console.log(error)
    return { status: 'error', error: 'Ocorreu um erro.' }
  }
}

export async function updateLine(
  lineId: string,
  data: DigitalMenuLineSchema,
): Promise<ActionResult<Line>> {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    const validated = digitalMenuLineSchema.safeParse(data)

    if (!validated.success)
      return { status: 'error', error: validated.error.errors }

    const { title } = validated.data

    const slug = generateSlug(title)

    const existingLine = await prisma.line.findFirst({
      where: { slug },
    })

    if (existingLine && existingLine.slug !== slug) {
      return { status: 'error', error: 'Linha existente' }
    }

    const line = await prisma.line.update({
      where: {
        id: lineId,
      },
      data: {
        userId,
        title,
        slug: generateSlug(title),
      },
    })

    return { status: 'success', data: line }
  } catch (error) {
    console.log(error)
    return { status: 'error', error: 'Ocorreu um erro.' }
  }
}

export async function deleteLine(id: string) {
  try {
    const userId = await getAuthUserId()

    if (!userId) return { status: 'error', error: 'Usuário não autorizado' }

    await prisma.line.delete({
      where: { id },
    })

    return { status: 'success', data: 'Deleted' }
  } catch (error) {
    console.error('Erro ao deletar a linha:', error)
    return { status: 'error', error: 'Falha ao deletar a linha' }
  }
}
