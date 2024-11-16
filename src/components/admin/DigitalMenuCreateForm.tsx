'use client'

import { CloudinaryUploadWidgetResults } from '@cloudinary-util/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  colors,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { Line } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import { toast } from 'sonner'

import { createDigitalMenu } from '@/actions/DigitalMenuActions'
import { getLines } from '@/actions/DigitalMenuLineActions'
import { ErrorMessage } from '@/components/ErrorMessage'
import { PhotoUploadButton } from '@/components/PhotoUploadButton'
import {
  DigitalMenuSchema,
  digitalMenuSchema,
} from '@/schemas/DigitalMenuSchema'

import { Editor } from '../Editor'

export function DigitalMenuCreateForm() {
  const [isLine, setIsLine] = useState<Line[]>()
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [inputContentValue, setInputContentValue] = useState('')

  const router = useRouter()

  const statuses = [
    { key: 'ACTIVATED', label: 'Ativado' },
    { key: 'DEACTIVATED', label: 'Desativado' },
  ]

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<DigitalMenuSchema>({
    resolver: zodResolver(digitalMenuSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    const lineFetch = async () => {
      const lineFetched = await getLines()
      setIsLine(lineFetched)
    }

    lineFetch()
  }, [])

  async function onAddPhoto(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === 'object') {
      const secureUrl = result.info.secure_url

      setValue('photo', secureUrl, { shouldValidate: true, shouldDirty: true })
      setPhotoURL(secureUrl)

      await trigger('photo')
    }
  }

  function handleRemovePhoto() {
    setValue('photo', '', { shouldValidate: true, shouldDirty: true })
    setPhotoURL('')
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const photoValue = e.target.value
    setValue('photo', photoValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    await trigger('photo')
  }

  const handleEditorValueChange = (value: string) => {
    setInputContentValue(value)
    setValue('description', value)
  }

  async function onSubmit(data: DigitalMenuSchema) {
    const result = await createDigitalMenu({
      ...data,
      photo: photoURL || '',
    })

    if (result.status === 'success') {
      router.push(`/dashboard/menu/${result.data.id}`)
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

  if (!isLine) return <div>Carregando...</div>

  return (
    <form
      className="grid grid-cols-[1fr_16rem] gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardBody>
          <>
            <div className="mb-2">
              <PhotoUploadButton
                removePhoto={handleRemovePhoto}
                className={
                  errors.photo?.message && !photoURL
                    ? 'border-2 border-danger'
                    : ''
                }
                onUploadImage={onAddPhoto}
                photoURL={photoURL ?? ''}
              />
              {errors.photo?.message && photoURL === '' ? (
                <span className="text-xs text-danger">
                  <ErrorMessage message={errors.photo?.message} />
                </span>
              ) : null}
            </div>
            <input
              type="hidden"
              {...register('photo', {
                onChange: handlePhotoChange,
              })}
            />
            <Textarea
              isRequired
              defaultValue=""
              minRows={1}
              type="text"
              label="Título"
              placeholder="Marmita tal"
              size="sm"
              variant="bordered"
              color="primary"
              className="mb-2"
              classNames={{
                input:
                  'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
              }}
              onClear={() => console.log('input cleared')}
              {...register('title')}
              isInvalid={!!errors.title}
              errorMessage={
                errors.title?.message ? (
                  <ErrorMessage message={errors.title.message} />
                ) : null
              }
            />
            <Editor
              placeholder=""
              {...register('description')}
              value={inputContentValue}
              onChange={handleEditorValueChange}
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
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
                }}
                startContent={<span className="text-slate-500">R$</span>}
                onClear={() => console.log('input cleared')}
                {...register('price')}
                isInvalid={!!errors.price}
                errorMessage={
                  errors.price?.message ? (
                    <ErrorMessage message={errors.price.message} />
                  ) : null
                }
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                min={0}
                label="Quantidade"
                placeholder="Quantidade do item"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('quantity')}
                isInvalid={!!errors.quantity}
                errorMessage={
                  errors.quantity?.message ? (
                    <ErrorMessage message={errors.quantity.message} />
                  ) : null
                }
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                label="Calorias"
                placeholder="Quantidade de calorias"
                size="sm"
                min={0}
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('calories')}
                isInvalid={!!errors.calories}
                errorMessage={
                  errors.calories?.message ? (
                    <ErrorMessage message={errors.calories.message} />
                  ) : null
                }
              />

              <Input
                isRequired
                defaultValue=""
                type="number"
                label="Estoque"
                min={0}
                placeholder="Quantidade do estoque"
                size="sm"
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
                }}
                onClear={() => console.log('input cleared')}
                {...register('stock')}
                isInvalid={!!errors.stock}
                errorMessage={
                  errors.stock?.message ? (
                    <ErrorMessage message={errors.stock.message} />
                  ) : null
                }
              />
            </div>
          </>
        </CardBody>
      </Card>
      <Card>
        <CardHeader className="pb-0 text-base font-bold text-slate-500">
          Publicar
        </CardHeader>
        <CardBody>
          <Select
            isRequired
            {...register('status', {
              onChange: (e) =>
                setValue('status', e.target.value, {
                  shouldValidate: true,
                }),
            })}
            color="primary"
            variant="bordered"
            size="sm"
            classNames={{
              value:
                'text-slate-500 text-sm group-data-[has-value=true]:text-slate-600',
            }}
            label="Status"
            placeholder="Selecionar status"
            className="mb-2 max-w-xs"
            isInvalid={!!errors.status}
            errorMessage={
              errors.status?.message ? (
                <ErrorMessage message={errors.status.message} />
              ) : null
            }
          >
            {statuses.map((status) => (
              <SelectItem key={status.key} color="secondary" value={status.key}>
                {status.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            color="primary"
            variant="bordered"
            size="sm"
            classNames={{
              value:
                'text-slate-500 text-sm group-data-[has-value=true]:text-slate-600',
            }}
            label="Linha"
            placeholder="Selecionar linha"
            className="max-w-xs"
            {...register('lineId', {
              onChange: (e) =>
                setValue('lineId', e.target.value, {
                  shouldValidate: true,
                }),
            })}
            isInvalid={!!errors.lineId}
            errorMessage={
              errors.lineId?.message ? (
                <ErrorMessage message={errors.lineId.message} />
              ) : null
            }
          >
            {isLine.map((line) => (
              <SelectItem key={line.id} color="secondary">
                {line.title}
              </SelectItem>
            ))}
          </Select>
          <Button
            className="mt-auto font-bold text-white disabled:!cursor-not-allowed"
            size="lg"
            color="success"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={!isValid || !isDirty}
          >
            Criar item
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
