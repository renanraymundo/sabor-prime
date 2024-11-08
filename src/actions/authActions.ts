'use server'

import { AuthError } from 'next-auth'

import { ActionResult } from '@/actions'
import { auth, signIn, signOut } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AuthSchema } from '@/schemas/AuthSchema'

export async function signInUser(
  data: AuthSchema,
): Promise<ActionResult<string>> {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    console.log(result)

    return { status: 'success', data: 'Logged In' }
  } catch (error) {
    console.log(error)

    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { status: 'error', error: 'Credenciais inválidas.' }
          break

        default:
          return { status: 'error', error: 'Algo deu errado.' }
          break
      }
    } else {
      return { status: 'error', error: 'Ocorreu um outro erro.' }
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/login' })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getAuthUserId() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('Unauthorized')

  return userId
}
