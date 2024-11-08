'use client'
import { Card, CardBody, Chip, Image, Tab, Tabs } from '@nextui-org/react'

import { DigitalMenuPrice } from '@/components/DigitalMenuPrice'
import { DigitalMenuQuantityInput } from '@/components/DigitalMenuQuantityInput'

type DigitalMenuContentItemProps = {
  title: string
  id: string
  photo: string
  price: number
  quantity: number
  calories: number
  stock: number
  status: 'ACTIVATED' | 'DEACTIVATED'
  line: {
    title: string
  } | null
}

type DigitalMenuContentProps = {
  items: DigitalMenuContentItemProps[]
}

function groupItemsByLine(items: DigitalMenuContentItemProps[]) {
  const groupedItems: Record<string, DigitalMenuContentItemProps[]> = {}
  items.forEach((item) => {
    const categoryTitle = item.line?.title || 'Sem Linha'
    if (!groupedItems[categoryTitle]) {
      groupedItems[categoryTitle] = []
    }
    groupedItems[categoryTitle].push(item)
  })
  return groupedItems
}

export function DigitalMenuContent({ items }: DigitalMenuContentProps) {
  const groupedItems = groupItemsByLine(items)

  return (
    <Tabs
      aria-label="Linhas Sabor Prime"
      color="secondary"
      className="mx-auto mt-6 flex max-w-max"
      classNames={{
        base: '!max-w-none',
        tabContent: 'text-slate-500',
        tab: 'text-xl p-4 h-12',
        tabList: 'max-xs:flex-col max-xs:w-full mx-auto !mb-4',
      }}
    >
      {Object.entries(groupedItems).map(([categoryTitle, categoryItems]) => {
        return (
          <Tab key={categoryTitle} title={`${categoryTitle} (320g)`}>
            <div className="grid gap-3 lg:grid-cols-2">
              {categoryItems.map((menu) => {
                return (
                  <Card
                    key={menu.id}
                    className={
                      menu.status === 'DEACTIVATED'
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  >
                    <CardBody className="grid gap-2 max-xs:grid-cols-1 xs:grid-cols-[8rem_1fr_3rem]">
                      <div>
                        <Image
                          className="aspect-square h-full w-full rounded-large object-cover max-xs:w-full xs:w-32"
                          src={menu.photo}
                          alt={menu.title}
                        />
                        <div className="absolute right-6 top-6 z-10 flex h-12 w-12 flex-col items-center justify-center rounded-large bg-white py-2 leading-4 xs:hidden">
                          <span className="text-slate-500">Kcal</span>
                          <span className="text-primary">{menu.calories}</span>
                        </div>
                      </div>
                      <div className="space-y-2 max-xs:text-center">
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            menu.status === 'DEACTIVATED' ? 'danger' : 'primary'
                          }
                          className={
                            menu.status === 'DEACTIVATED'
                              ? 'text-red-500'
                              : 'text-primary-500'
                          }
                        >
                          {menu.status !== 'DEACTIVATED'
                            ? `Estoque: ${menu.stock} ${menu.stock > 1 ? 'unidades' : 'unidade'}`
                            : 'Esgotado'}
                        </Chip>
                        <p className="text-xl font-normal leading-6 text-slate-500">
                          {menu.title}
                        </p>
                        <ul className="flex items-center justify-between gap-2 max-xs:flex-col xs:flex-row">
                          <li className="flex items-center gap-2">
                            <DigitalMenuQuantityInput
                              key={menu.id}
                              id={menu.id}
                              stock={menu.stock}
                              price={menu.price}
                              title={menu.title}
                            />
                          </li>
                          <li>
                            <DigitalMenuPrice
                              id={menu.id}
                              size="md"
                              price={menu.price}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="mb-auto flex h-12 w-12 flex-col items-center justify-center rounded-large bg-slate-100 py-2 leading-4 max-xs:mx-auto max-xs:hidden">
                        <span className="text-slate-500">Kcal</span>
                        <span className="text-primary">{menu.calories}</span>
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          </Tab>
        )
      })}
    </Tabs>
  )
}
