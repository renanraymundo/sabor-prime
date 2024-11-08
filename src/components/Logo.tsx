import Image from 'next/image'
import Link from 'next/link'

import SaborPrimeLogo from '@/app/assets/sabor-prime-logo.svg'

export function Logo() {
  return (
    <Link href="/" className="max-sm:w-20">
      <Image
        src={SaborPrimeLogo}
        width={100}
        height={220}
        alt="Logo da Sabor Prime"
      />
    </Link>
  )
}
