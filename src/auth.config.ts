import { compare } from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUserByEmail } from '@/actions/authActions'
import { authSchema } from '@/schemas/AuthSchema'

export default {
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        const validated = authSchema.safeParse(creds)

        if (validated.success) {
          const { email, password } = validated.data

          const user = await getUserByEmail(email)

          if (!user || !(await compare(password, user.passwordHash)))
            return null

          return user
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
