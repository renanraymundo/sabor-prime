'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '@/components/ErrorMessage'
import { sleep } from '@/lib/utils'
import {
  CreateDigitalMenuSchema,
  createDigitalMenuSchema,
} from '@/schemas/DigitalMenuSchema'

export function DigitalMenuCreateForm() {
  const statuses = [
    { key: 'ACTIVATED', label: 'Ativado' },
    { key: 'DEACTIVATED', label: 'Desativado' },
  ]

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<CreateDigitalMenuSchema>({
    resolver: zodResolver(createDigitalMenuSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data: CreateDigitalMenuSchema) {
    await sleep(3000)
    console.log(data)
  }

  return (
    <form
      className="grid grid-cols-[1fr_16rem] gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardBody>
          <>
            <Input
              isRequired
              defaultValue=""
              type="text"
              label="Foto"
              placeholder="Foto do item"
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
              }}
              onClear={() => console.log('input cleared')}
              {...register('photo')}
              isInvalid={!!errors.photo}
              errorMessage={<ErrorMessage message={errors.photo?.message} />}
            />

            <Textarea
              isRequired
              defaultValue=""
              type="text"
              label="Título"
              placeholder="Marmita tal"
              size="sm"
              variant="bordered"
              color="primary"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
              }}
              onClear={() => console.log('input cleared')}
              {...register('title')}
              isInvalid={!!errors.title}
              errorMessage={<ErrorMessage message={errors.title?.message} />}
            />

            <div className="grid grid-cols-4 gap-2">
              <Input
                isRequired
                defaultValue=""
                type="text"
                label="Preço unitário"
                placeholder="Preço do item"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
                }}
                startContent={<span className="text-slate-500">R$</span>}
                onClear={() => console.log('input cleared')}
                {...register('price')}
                isInvalid={!!errors.price}
                errorMessage={<ErrorMessage message={errors.price?.message} />}
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                label="Quantidade"
                placeholder="Quantidade do item"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('quantity')}
                isInvalid={!!errors.quantity}
                errorMessage={
                  <ErrorMessage message={errors.quantity?.message} />
                }
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                label="Calorias"
                placeholder="Quantidade de calorias"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('calories')}
                isInvalid={!!errors.calories}
                errorMessage={
                  <ErrorMessage message={errors.calories?.message} />
                }
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                label="Estoque"
                placeholder="Quantidade do estoque"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('stock')}
                isInvalid={!!errors.stock}
                errorMessage={<ErrorMessage message={errors.stock?.message} />}
              />
            </div>
          </>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="pb-0 text-xl text-slate-500">
          Publicar
        </CardHeader>
        <CardBody>
          <Select
            isRequired
            color="primary"
            variant="bordered"
            size="sm"
            classNames={{
              value:
                'text-slate-500 text-base group-data-[has-value=true]:text-slate-600',
            }}
            label="Status"
            placeholder="Selecionar status"
            className="max-w-xs"
            {...register('status')}
            isInvalid={!!errors.status}
            errorMessage={<ErrorMessage message={errors.status?.message} />}
          >
            {statuses.map((status) => (
              <SelectItem key={status.key} color="secondary">
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <Button
            className="mt-auto text-white disabled:!cursor-not-allowed"
            size="lg"
            color="success"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            <span className="h-5 text-white">Criar item</span>
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
