'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, colors, Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import { toast } from 'sonner'

import { updateOrderStatus } from '@/actions/DigitalMenuOrderActions'
import { ErrorMessage } from '@/components/ErrorMessage'
import { getIdByParams } from '@/lib/utils'
import {
  UpdateDigitalMenuOrderSchema,
  updateDigitalMenuOrderSchema,
} from '@/schemas/DigitalMenuOrderSchema'

import { OrdersWithItems } from './DigitalMenuOrderItemsTable'

type DigitalMenuOrderStatusFormProps = UpdateDigitalMenuOrderSchema

export function DigitalMenuOrderStatusForm({
  status,
  order,
}: DigitalMenuOrderStatusFormProps & { order: OrdersWithItems }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<UpdateDigitalMenuOrderSchema>({
    resolver: zodResolver(updateDigitalMenuOrderSchema),
    mode: 'onTouched',
  })
  const pathname = usePathname()
  const router = useRouter()
  const id = getIdByParams(pathname)

  async function onSubmit(data: UpdateDigitalMenuOrderSchema) {
    const result = await updateOrderStatus(id, data.status, order)

    if (result.status === 'success') {
      toast.success('Status atualizado com sucesso', {
        icon: <LuShieldAlert size={18} />,
        action: (
          <FiX
            className="ml-auto cursor-pointer text-success"
            size={20}
            onClick={() => toast.dismiss()}
          />
        ),
        style: {
          backgroundColor: colors.light.success[500],
          border: colors.light.success[500],
          color: colors.white,
        },
      })
      router.refresh()
    } else {
      toast.error(result.error as string, {
        icon: <LuShieldAlert size={18} />,
        action: (
          <FiX
            className="ml-auto cursor-pointer text-danger"
            size={20}
            onClick={() => toast.dismiss()}
          />
        ),
        style: {
          backgroundColor: colors.light.danger[500],
          border: colors.light.danger[500],
          color: colors.white,
        },
      })
    }
  }

  const statuses = [
    { key: 'CANCELLED', label: 'Cancelado' },
    { key: 'INPROCESS', label: 'Em andamento' },
    { key: 'COMPLETED', label: 'Finalizado' },
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center gap-2"
    >
      <Select
        defaultSelectedKeys={[status]}
        isRequired
        color="primary"
        variant="bordered"
        size="sm"
        classNames={{
          helperWrapper: 'p-0',
          value:
            'text-slate-500 text-sm group-data-[has-value=true]:text-slate-600',
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
        className="mt-auto px-12 font-bold text-white disabled:!cursor-not-allowed"
        size="lg"
        color="success"
        type="submit"
        isLoading={isSubmitting}
        isDisabled={!isValid || !isDirty}
      >
        Atualizar status
      </Button>
    </form>
  )
}
