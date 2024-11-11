'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

import { deleteLine } from '@/actions/DigitalMenuLineActions'

type DigitalMenuLineDeleteProps = {
  id: string
}
export function DigitalMenuLineDelete({ id }: DigitalMenuLineDeleteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleDeleteDigitalMenu() {
    await deleteLine(id)
    setIsLoading(true)

    setTimeout(() => {
      router.refresh()
      setIsLoading(false)
    }, 3000)
  }
  return (
    <Tooltip color="danger" content="Deletar linha">
      <Button
        className="min-w-fit cursor-pointer p-0 text-lg text-danger hover:!bg-transparent active:opacity-50"
        variant="light"
        isLoading={isLoading}
        onClick={handleDeleteDigitalMenu}
      >
        {!isLoading && <FiTrash />}
      </Button>
    </Tooltip>
  )
}
