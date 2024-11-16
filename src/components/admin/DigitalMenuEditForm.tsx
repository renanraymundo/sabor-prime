'use client'

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
import { DigitalMenu, Line } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiX } from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import { toast } from 'sonner'

import { updateDigitalMenu } from '@/actions/DigitalMenuActions'
import { getLines } from '@/actions/DigitalMenuLineActions'
import { ErrorMessage } from '@/components/ErrorMessage'
import { getIdByParams } from '@/lib/utils'
import {
  DigitalMenuSchema,
  digitalMenuSchema,
} from '@/schemas/DigitalMenuSchema'

import { Editor } from '../Editor'
import { PhotoUploadButton } from '../PhotoUploadButton'

type DigitalMenuEditFormProps = {
  digitalMenu: DigitalMenu
}

export function DigitalMenuEditForm({ digitalMenu }: DigitalMenuEditFormProps) {
  const [isLine, setIsLine] = useState<Line[]>()
  const [photoURL, setPhotoURL] = useState<string | null>(digitalMenu.photo)
  const [inputContentValue, setInputContentValue] = useState<string>(
    digitalMenu.description || '',
  )
  const router = useRouter()
  const pathname = usePathname()
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

  const digitalMenuId = getIdByParams(pathname)

  useEffect(() => {
    const lineFetch = async () => {
      const lineFetched = await getLines()
      setIsLine(lineFetched)
    }

    lineFetch()
  }, [])

  const handleEditorValueChange = (value: string) => {
    setInputContentValue(value)
    setValue('description', value, { shouldDirty: true })
  }

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

  async function onSubmit(data: DigitalMenuSchema) {
    const result = await updateDigitalMenu(digitalMenuId, data)

    if (result.status === 'success') {
      toast.success('Item atualizado com sucesso', {
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

  if (!isLine) return

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
                  errors.photo?.message && photoURL === ''
                    ? 'border-2 border-danger'
                    : ''
                }
                onUploadImage={onAddPhoto}
                photoURL={photoURL as string}
              />
              {errors.photo?.message && photoURL === '' ? (
                <span className="text-xs text-danger">
                  <ErrorMessage message={errors.photo?.message} />
                </span>
              ) : (
                ''
              )}
            </div>
            <input
              type="hidden"
              value={photoURL as string}
              {...register('photo', {
                onChange: handlePhotoChange,
              })}
            />

            <Textarea
              isRequired
              defaultValue={digitalMenu.title}
              minRows={1}
              type="text"
              label="Título"
              placeholder="Marmita tal"
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

            <Editor
              placeholder="Ingredientes..."
              {...register('description')}
              value={inputContentValue}
              onChange={handleEditorValueChange}
            />

            <div className="grid grid-cols-4 gap-2">
              <Input
                isRequired
                defaultValue={`${digitalMenu.price}`}
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
                errorMessage={<ErrorMessage message={errors.price?.message} />}
              />

              <Input
                isRequired
                defaultValue={`${digitalMenu.quantity}`}
                type="number"
                label="Quantidade"
                placeholder="Quantidade do item"
                size="sm"
                variant="bordered"
                min={0}
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
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
                defaultValue={`${digitalMenu.calories}`}
                type="number"
                label="Calorias"
                placeholder="Quantidade de calorias"
                size="sm"
                variant="bordered"
                min={0}
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
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
                defaultValue={`${digitalMenu.stock}`}
                type="number"
                label="Estoque"
                placeholder="Quantidade do estoque"
                size="sm"
                min={0}
                variant="bordered"
                color="primary"
                classNames={{
                  input:
                    'text-slate-600 placeholder:text-slate-300 placeholder:text-sm text-base',
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
            defaultSelectedKeys={[digitalMenu.status ? digitalMenu.status : '']}
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

          <Select
            isRequired
            defaultSelectedKeys={[digitalMenu.lineId ? digitalMenu.lineId : '']}
            color="primary"
            variant="bordered"
            size="sm"
            classNames={{
              value:
                'text-slate-500 text-base group-data-[has-value=true]:text-slate-600',
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
            errorMessage={<ErrorMessage message={errors.lineId?.message} />}
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
            Salvar alterações
          </Button>
        </CardBody>
      </Card>
    </form>
  )
}
