import Image from 'next/image'

import SaborPrimeLogo from '@/app/assets/sabor-prime-logo.svg'

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-8 max-sm:p-4">
      <Image
        src={SaborPrimeLogo}
        width={300}
        height={220}
        alt="Logo da Sabor Prime"
      />

      <div className="space-y-3">
        <h1 className="relative mx-auto flex max-w-max items-center gap-2 rounded-xl bg-gradient-to-r from-sabor-prime-orange-300 to-sabor-prime-orange-100 px-8 py-2 text-5xl text-white before:h-2 before:w-2 before:rounded-full before:bg-white after:h-2 after:w-2 after:rounded-full after:bg-white">
          Em Breve!
        </h1>
        <p className="text-center text-xl leading-6 text-slate-400">
          Estamos quase prontos! Nosso site estará disponível em breve. <br />
          Fique ligado! Testando deploy
        </p>
      </div>
    </div>
  )
}
