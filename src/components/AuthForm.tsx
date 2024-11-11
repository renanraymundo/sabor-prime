'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, colors, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi'
import { LuShieldAlert } from 'react-icons/lu'
import { toast } from 'sonner'

import { signInUser } from '@/actions/authActions'
import { AuthSchema, authSchema } from '@/schemas/AuthSchema'

import { ErrorMessage } from './ErrorMessage'

export function AuthForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible)

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data: AuthSchema) {
    const result = await signInUser(data)
    if (result.status === 'success') {
      router.push('/dashboard')
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
      <Input
        isRequired
        defaultValue=""
        type="text"
        label="E-mail"
        placeholder="Insira seu e-mail"
        size="sm"
        variant="bordered"
        color="primary"
        classNames={{
          input:
            'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
        }}
        onClear={() => console.log('input cleared')}
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={<ErrorMessage message={errors.email?.message} />}
      />

      <Input
        isRequired
        defaultValue=""
        label="Senha"
        placeholder="Insira sua senha"
        size="sm"
        variant="bordered"
        color="primary"
        classNames={{
          input:
            'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <FiEye className="pointer-events-none text-base text-default-400" />
            ) : (
              <FiEyeOff className="pointer-events-none text-base text-default-400" />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={<ErrorMessage message={errors.password?.message} />}
      />
      <Button
        isLoading={isSubmitting}
        className="mt-2 w-full"
        variant="solid"
        color="primary"
        size="lg"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  )
}
