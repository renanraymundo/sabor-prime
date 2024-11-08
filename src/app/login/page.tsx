import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Metadata } from 'next'

import { AuthForm } from '@/components/AuthForm'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Login | Sabor Prime',
}

export default function LoginPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="theme-container">
        <Card className="mx-auto w-full max-w-96">
          <CardHeader className="flex flex-col gap-4">
            <Logo />
            <h1 className="text-xl text-slate-500">Login</h1>
          </CardHeader>
          <CardBody>
            <AuthForm />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
