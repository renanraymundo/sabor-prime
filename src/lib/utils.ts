import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DigitalMenuProps = {
  id: string
  category: string
  photo: string
  title: string
  price: string
  calories: number
}

export function groupDigitalMenuItemsByCategory(
  items: DigitalMenuProps[],
): Record<string, DigitalMenuProps[]> {
  return items.reduce(
    (acc, item) => {
      const { category } = item
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, DigitalMenuProps[]>,
  )
}

export function generateProtocolNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const dateBr = `${date.slice(6, 8)}${date.slice(4, 6)}${date.slice(0, 4)}`
  const random = Math.floor(1000 + Math.random() * 9000)

  return `P${dateBr}-${String(random)}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatPhoneNumber(phoneNumber: string) {
  const cleanedNumber = phoneNumber.replace(/\D/g, '')

  const ddd = cleanedNumber.slice(0, 2)
  const number = cleanedNumber.slice(2)

  return `+55${ddd}${number}`
}

export function setAdminPageTitle(pathname: string, id: string) {
  switch (pathname) {
    case '/dashboard':
      return 'Dashboard'

    case '/dashboard/menu/items':
      return 'Todos os itens'

    case `/dashboard/menu/${id}`:
      return 'Item criado'

    case '/dashboard/menu/create':
      return 'Adicionar novo'

    case '/dashboard/lines/items':
      return 'Todas as linhas'

    case '/dashboard/lines/create':
      return 'Adicionar nova'

    case `/dashboard/lines/${id}`:
      return 'Linha criada'

    case '/dashboard/orders':
      return 'Todos os pedidos'

    case `/dashboard/orders/${id}`:
      return 'Pedido solicitado'

    default:
      return null
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getIdByParams(pathname: string) {
  const arr = pathname.split('/')
  const lastItem = arr[arr.length - 1]
  return lastItem
}
