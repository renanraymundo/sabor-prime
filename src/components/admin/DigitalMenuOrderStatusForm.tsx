import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '@/components/ErrorMessage'
import {
  UpdateDigitalMenuOrderSchema,
  updateDigitalMenuOrderSchema,
} from '@/schemas/DigitalMenuOrderSchema'

type DigitalMenuOrderStatusFormProps = UpdateDigitalMenuOrderSchema

export function DigitalMenuOrderStatusForm({
  status,
}: DigitalMenuOrderStatusFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<UpdateDigitalMenuOrderSchema>({
    resolver: zodResolver(updateDigitalMenuOrderSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data: UpdateDigitalMenuOrderSchema) {
    console.log(data)
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
        className="mt-auto px-8 text-white disabled:!cursor-not-allowed"
        size="lg"
        color="success"
        type="submit"
        isLoading={isSubmitting}
        isDisabled={!isValid || !isDirty}
      >
        <span className="h-5 text-white">Atualizar status</span>
      </Button>
    </form>
  )
}
