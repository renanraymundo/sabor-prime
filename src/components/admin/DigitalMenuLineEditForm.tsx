'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { Line } from '@prisma/client'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '@/components/ErrorMessage'
import { sleep } from '@/lib/utils'
import {
  DigitalMenuLineSchema,
  digitalMenuLineSchema,
} from '@/schemas/DigitalMenuLineSchema'

type DigitalMenuLineEditFormProps = {
  line: Line
}

export function DigitalMenuLineEditForm({
  line,
}: DigitalMenuLineEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<DigitalMenuLineSchema>({
    resolver: zodResolver(digitalMenuLineSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data: DigitalMenuLineSchema) {
    await sleep(3000)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardBody>
          <Input
            isRequired
            defaultValue={line.title}
            type="text"
            label="Título"
            placeholder="Linha tal"
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
          <Button
            className="mt-auto max-w-max text-white disabled:!cursor-not-allowed"
            size="lg"
            color="success"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            <span className="h-5 text-white">Salvar alterações</span>
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
