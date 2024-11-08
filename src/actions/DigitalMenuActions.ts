'use server'

import { prisma } from '@/lib/prisma'

type MenuItem = {
  id: string
  photo: string
  title: string
  price: number
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
