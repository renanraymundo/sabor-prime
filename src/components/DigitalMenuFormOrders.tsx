'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Link, Select, SelectItem } from '@nextui-org/react'
import { OrderItem } from '@prisma/client'
import Image from 'next/image'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

import {
  createOrder,
  CreateOrderSchema,
} from '@/actions/DigitalMenuOrderActions'
import CountryFlag from '@/app/assets/country-flag.svg'
import { ultraMessage } from '@/lib/ultraMessage'
import { formatPhoneNumber, generateProtocolNumber, sleep } from '@/lib/utils'
import { createDigitalMenuOrderSchema } from '@/schemas/DigitalMenuOrderSchema'

import { ErrorMessage } from './ErrorMessage'
import Modal from './Modal'

type DigitalMenuFormOrdersProps = HTMLAttributes<HTMLDivElement>

export function DigitalMenuFormOrders({
  ...props
}: DigitalMenuFormOrdersProps) {
  const [phone, setPhone] = useState<string>('')
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateOrderSchema>({
    resolver: zodResolver(createDigitalMenuOrderSchema),
    mode: 'onTouched',
  })

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value.replace(/\D/g, '')

    if (e.target.value.length < phone.length) {
      setPhone(e.target.value)
      return
    }

    if (input.length > 11) {
      input = input.slice(0, 11)
    }

    const formattedPhone = input.replace(
      /^(\d{2})(\d{5})(\d{0,4})/,
      '($1) $2-$3',
    )
    setPhone(formattedPhone)
    setValue('whatsapp', formattedPhone)
  }

  const states = [
    { id: '0', value: 'AC' },
    { id: '1', value: 'AL' },
    { id: '2', value: 'AM' },
    { id: '3', value: 'AP' },
    { id: '4', value: 'BA' },
    { id: '5', value: 'CE' },
    { id: '6', value: 'DF' },
    { id: '7', value: 'ES' },
    { id: '8', value: 'GO' },
    { id: '9', value: 'MA' },
    { id: '10', value: 'MG' },
    { id: '11', value: 'MS' },
    { id: '12', value: 'MT' },
    { id: '13', value: 'PA' },
    { id: '14', value: 'PB' },
    { id: '15', value: 'PE' },
    { id: '16', value: 'PI' },
    { id: '17', value: 'PR' },
    { id: '18', value: 'RJ' },
    { id: '19', value: 'RN' },
    { id: '20', value: 'RO' },
    { id: '21', value: 'RR' },
    { id: '22', value: 'RS' },
    { id: '23', value: 'SC' },
    { id: '24', value: 'SE' },
    { id: '25', value: 'SP' },
    { id: '26', value: 'TO' },
  ]

  async function onSubmit(data: CreateOrderSchema) {
    const productsCart = localStorage.getItem('productsCart')
    const items = productsCart ? JSON.parse(productsCart) : []

    const formattedWhatsApp = data.whatsapp.replace(
      /^(\d{2})(\d{5})(\d{0,4})/,
      '($1) $2-$3',
    )

    const orderData = {
      protocolNumber: generateProtocolNumber(),
      name: data.name,
      address: data.address,
      complement: data.complement,
      whatsapp: formattedWhatsApp,
      city: data.city,
      state: 'São Paulo',
      items: items.map((item: OrderItem) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      })),
    }

    try {
      await sleep(3000)
      await createOrder(orderData)

      const { protocolNumber, name, whatsapp, items } = orderData

      await ultraMessage(
        true,
        protocolNumber,
        '+5519993035607',
        name,
        whatsapp,
        items,
      )

      await ultraMessage(
        false,
        protocolNumber,
        formatPhoneNumber(whatsapp),
        name,
        whatsapp,
        items,
      )

      setModalIsOpen(true)
    } catch (error) {
      console.error('Failed to create order:', error)
    }
  }

  return (
    <>
      <form className={props.className} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col flex-wrap gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              isRequired
              defaultValue=""
              type="text"
              label="Nome completo"
              placeholder="Insira seu nome completo"
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-sm',
              }}
              onClear={() => console.log('input cleared')}
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={<ErrorMessage message={errors.name?.message} />}
            />

            <Input
              isRequired
              type="tel"
              label="WhatsApp"
              size="sm"
              variant="bordered"
              color="primary"
              value={phone}
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-sm',
              }}
              startContent={
                <div className="mr-[10px] flex items-center gap-1">
                  <Image
                    className="relative -top-[1px]"
                    width={20}
                    height={26}
                    src={CountryFlag}
                    alt="Bandeira do Brasil"
                  />
                  <span className="text-sm text-slate-600">+55 </span>
                </div>
              }
              onClear={() => setPhone('')}
              {...register('whatsapp', {
                onChange: handlePhoneChange,
              })}
              isInvalid={!!errors.whatsapp}
              errorMessage={<ErrorMessage message={errors.whatsapp?.message} />}
            />
          </div>
          <div className="grid grid-cols-[1fr_11rem] gap-3">
            <Input
              isRequired
              type="text"
              label="Endereço"
              placeholder="Rua tal, 1234"
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-sm',
              }}
              onClear={() => console.log('input cleared')}
              {...register('address')}
              isInvalid={!!errors.address}
              errorMessage={<ErrorMessage message={errors.address?.message} />}
            />
            <Input
              type="text"
              label="Complemento"
              placeholder="Apto, bloco..."
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-sm',
              }}
              onClear={() => console.log('input cleared')}
              {...register('complement')}
            />
          </div>
          <div className="grid grid-cols-[1fr_7rem] gap-3">
            <Input
              isRequired
              type="text"
              label="Cidade"
              placeholder="Insira sua Cidade"
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-sm',
              }}
              onClear={() => console.log('input cleared')}
              {...register('city')}
              isInvalid={!!errors.city}
              errorMessage={<ErrorMessage message={errors.city?.message} />}
            />
            <Select
              isDisabled
              defaultSelectedKeys={['25']}
              label="Estado"
              placeholder="Selecione o Estado"
              color="primary"
              variant="bordered"
              size="sm"
              classNames={{
                value:
                  'text-slate-500 text-sm group-data-[has-value=true]:text-slate-600',
              }}
            >
              {states.map((state) => (
                <SelectItem key={state.id} color="secondary">
                  {state.value}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Button
              size="lg"
              color="secondary"
              variant="ghost"
              as={Link}
              href="/"
              className="flex items-center gap-1 font-bold"
            >
              <FaArrowLeftLong />
              Alterar Pedido
            </Button>
            <Button
              size="lg"
              color="primary"
              variant="solid"
              className="flex items-center gap-1 font-bold"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isValid}
            >
              Enviar Pedido
              <FaArrowRightLong />
            </Button>
          </div>
        </div>
      </form>

      <Modal isOpen={isModalOpen} />
    </>
  )
}
