'use client'
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  Chip,
  cn,
  Image,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { TbListDetails } from 'react-icons/tb'

import { DigitalMenuPrice } from '@/components/DigitalMenuPrice'
import { DigitalMenuQuantityInput } from '@/components/DigitalMenuQuantityInput'

export type DigitalMenuContentItemProps = {
  title: string
  description?: string
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
    const lineTitle = item.line?.title || 'Sem Linha'
    if (!groupedItems[lineTitle]) {
      groupedItems[lineTitle] = []
    }
    groupedItems[lineTitle].push(item)
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
        tab: 'text-base p-4 h-12 font-bold',
        tabList: 'max-xs:flex-col max-xs:w-full mx-auto !mb-4 ',
      }}
    >
      {Object.entries(groupedItems)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([lineTitle, categoryItems]) => {
          return (
            <Tab key={lineTitle} title={`${lineTitle}`}>
              <div
                className={cn(
                  'grid gap-3',
                  categoryItems.map((menu) =>
                    menu.line?.title === 'Kits e Promoções'
                      ? 'grid-cols-1'
                      : 'lg:grid-cols-2',
                  ),
                )}
              >
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
                            <span className="font-semibold text-slate-500">
                              Kcal
                            </span>
                            <span className="font-medium text-primary">
                              {menu.calories}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 max-xs:text-center">
                          <Chip
                            size="sm"
                            variant="flat"
                            color={
                              menu.status === 'DEACTIVATED'
                                ? 'danger'
                                : 'primary'
                            }
                            className={cn(
                              menu.status === 'DEACTIVATED'
                                ? 'text-red-500'
                                : 'text-primary-500',
                            )}
                          >
                            {menu.status !== 'DEACTIVATED'
                              ? `Estoque: ${menu.stock} ${menu.stock > 1 ? 'unidades' : 'Para finalizar seu '}`
                              : 'Esgotado'}
                          </Chip>
                          <p className="text-base font-semibold leading-5 text-slate-500">
                            {menu.title}
                          </p>
                          {menu.description && (
                            <Accordion className="px-0">
                              <AccordionItem
                                key={menu.id}
                                aria-label="Detalhes"
                                title="Detalhes"
                                classNames={{
                                  base: 'text-slate-500 text-sm text-start',
                                  heading: '[&>button]:p-0',

                                  title:
                                    'text-slate-500 font-semibold text-sm underline',
                                }}
                                startContent={
                                  <TbListDetails className="text-primary" />
                                }
                              >
                                <div
                                  className="px-6 [&>ul]:list-disc [&>ul]:space-y-1"
                                  dangerouslySetInnerHTML={{
                                    __html: menu.description,
                                  }}
                                />
                              </AccordionItem>
                            </Accordion>
                          )}

                          <ul className="flex items-center justify-between gap-2 max-xs:flex-col xs:flex-row">
                            <li className="flex items-center gap-2">
                              <DigitalMenuQuantityInput
                                key={menu.id}
                                id={menu.id}
                                stock={menu.stock}
                                price={menu.price}
                                title={menu.title}
                                line={menu.line?.title || ''}
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
                          <span className="font-semibold text-slate-500">
                            Kcal
                          </span>
                          <span className="font-medium text-primary">
                            {menu.calories}
                          </span>
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
