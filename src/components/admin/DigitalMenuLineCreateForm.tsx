'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, colors, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import { toast } from 'sonner'

import { createLine } from '@/actions/DigitalMenuLineActions'
import { ErrorMessage } from '@/components/ErrorMessage'
import {
  DigitalMenuLineSchema,
  digitalMenuLineSchema,
} from '@/schemas/DigitalMenuLineSchema'

export function DigitalMenuLineCreateForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<DigitalMenuLineSchema>({
    resolver: zodResolver(digitalMenuLineSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data: DigitalMenuLineSchema) {
    const result = await createLine(data)

    if (result.status === 'success') {
      router.push('/dashboard/lines/items')
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Input
            isRequired
            defaultValue=""
            type="text"
            label="Título"
            placeholder="Linha tal"
            size="sm"
            variant="bordered"
            color="primary"
            classNames={{
              input:
                'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
            }}
            onClear={() => console.log('input cleared')}
            {...register('title')}
            isInvalid={!!errors.title}
            errorMessage={<ErrorMessage message={errors.title?.message} />}
          />
          <Button
            className="mt-auto max-w-max font-bold text-white disabled:!cursor-not-allowed"
            size="lg"
            color="success"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            Criar linha
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
