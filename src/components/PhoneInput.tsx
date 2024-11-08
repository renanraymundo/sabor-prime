import { Input } from '@nextui-org/react'
import Image from 'next/image'
import { useState } from 'react'

import CountryFlag from '@/app/assets/country-flag.svg'

export function PhoneInput() {
  const [phone, setPhone] = useState('')

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target.value.replace(/\D/g, '')

    if (e.target.value.length < phone.length) {
      setPhone(e.target.value)
      return
    }

    if (input.length > 11) {
      input = input.slice(0, 11)
    }

    const formattedPhone = input.replace(
      /^(\d{2})(\d{5})(\d{0,4})/,
      '($1) $2-$3',
    )
    setPhone(formattedPhone)
  }

  return (
    <Input
      isRequired
      type="tel"
      label="WhatsApp"
      size="sm"
      variant="bordered"
      color="primary"
      value={phone}
      onChange={handlePhoneChange}
      classNames={{
        input:
          'text-slate-600 placeholder:text-slate-300 placeholder:text-base text-base',
      }}
      startContent={
        <div className="flex items-center gap-1">
          <Image
            className="relative -top-[1px]"
            width={20}
            height={26}
            src={CountryFlag}
            alt="Bandeira do Brasil"
          />
          <span className="text-base text-slate-600">+55 </span>
        </div>
      }
    />
  )
}
