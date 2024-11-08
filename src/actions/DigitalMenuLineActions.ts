'use server'

// import { Line } from '@prisma/client'

import { prisma } from '@/lib/prisma'

export async function getLines() {
  try {
    const lines = await prisma.line.findMany()

    return lines
  } catch (error) {
    console.log(error)
    throw Error
  }
}

export async function getLineById(id: string) {
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
