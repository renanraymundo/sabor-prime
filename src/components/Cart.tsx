'use client'

import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { FiShoppingCart } from 'react-icons/fi'

import { getDigitalMenusByIds } from '@/actions/DigitalMenuActions'
import { useCart } from '@/providers/CartProvider'

export function Cart() {
  const { productsCart, removeProductFromCart, clearCart } = useCart()

  const quantityItems = productsCart.map((item) => item.quantity)
  const count = quantityItems.reduce((acc, actualValue) => acc + actualValue, 0)

  const [digitalMenuOptions, setDigitalMenuOptions] = useState<Record<
    string,
    { photo: string; title: string; price: number }
  > | null>(null)

  useEffect(() => {
    async function fetchDigitalMenus() {
      const ids = productsCart.map((item) => item.id)
      const options = await getDigitalMenusByIds(ids)
      setDigitalMenuOptions(options)
    }

    fetchDigitalMenus()
  }, [productsCart])

  if (!digitalMenuOptions)
    return <p className="text-slate-500">carregando...</p>

  return (
    <Dropdown
      placement="bottom-end"
      radius="sm"
      classNames={{
        base: 'before:bg-default-200 max-w-80 w-full',
        content: 'p-0 border-small border-divider bg-background',
      }}
    >
      <DropdownTrigger>
        <Button
          radius="full"
          isIconOnly
          aria-label="cart"
          variant="light"
          className="overflow-visible"
        >
          <Badge
            content={count || 0}
            shape="circle"
            color="danger"
            classNames={{
              badge: 'font-bold text-xs',
            }}
          >
            <FiShoppingCart size={24} className="text-slate-500" />
          </Badge>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Cart items"
        className="p-3"
        itemClasses={{
          base: [
            'rounded-md',
            'text-slate-500',
            'transition-opacity',
            'data-[hover=true]:text-slate-500',
            'data-[hover=true]:bg-slate-50',
            'data-[selectable=true]:focus:bg-slate-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-slate-500',
          ],
        }}
      >
        <DropdownSection aria-label="Items in Cart" showDivider>
          <DropdownItem isReadOnly>
            <h1 className="text-base font-semibold text-primary">Carrinho</h1>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection className="[&>ul]:space-y-2">
          <>
            {productsCart.length <= 0 ? (
              <DropdownItem className="text-slate-500">
                Seu carrinho está vazio.
              </DropdownItem>
            ) : (
              productsCart.map((item) => {
                const totalPrice =
                  digitalMenuOptions[item.id]?.price * item.quantity
                return (
                  <DropdownItem
                    key={item.id}
                    className="[&>span]:justify-content-between bg-slate-100 [&>span]:flex [&>span]:items-center [&>span]:gap-2"
                    as="div"
                  >
                    <Image
                      className="aspect-square h-12 w-12 rounded-md object-cover"
                      src={digitalMenuOptions[item.id]?.photo}
                      alt={digitalMenuOptions[item.id]?.title}
                    />
                    <ul className="flex-1">
                      <li className="text-sm leading-4 text-slate-500">
                        {`${digitalMenuOptions[item.id]?.title?.slice(0, 23)}${
                          digitalMenuOptions[item.id]?.title?.length > 23
                            ? '...'
                            : ''
                        }` || 'Produto não encontrado'}
                      </li>
                      <li className="flex items-center gap-2 text-slate-500">
                        <p className="h-[18px] text-sm">
                          <span className="text-slate-600">Qtde: </span>&nbsp;
                          {item.quantity}
                        </p>
                        <p>
                          <span className="text-sm text-slate-600">Total:</span>
                          &nbsp;
                          <span className="text-base font-semibold text-secondary">
                            {totalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </p>
                      </li>
                    </ul>
                    <Button
                      className="flex h-8 w-8 min-w-fit items-center justify-center p-0"
                      color="danger"
                      variant="solid"
                      onClick={() => removeProductFromCart(item.id)}
                    >
                      <BiTrash />
                    </Button>
                  </DropdownItem>
                )
              })
            )}
            {count && count > 0 && (
              <DropdownItem
                as="button"
                key="delete"
                className="max-w-max text-danger hover:!bg-danger-100 hover:!text-danger"
                color="danger"
                variant="solid"
                onClick={clearCart}
              >
                Limpar carrinho
              </DropdownItem>
            )}
          </>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
