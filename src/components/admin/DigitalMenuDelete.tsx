'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

import { deleteDigitalMenu } from '@/actions/DigitalMenuActions'

type MenuDigitalDeleteProps = {
  id: string
}
export function DigitalMenuDelete({ id }: MenuDigitalDeleteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleDeleteDigitalMenu() {
    await deleteDigitalMenu(id)
    setIsLoading(true)

    setTimeout(() => {
      router.refresh()
      setIsLoading(false)
    }, 3000)
  }
  return (
    <Tooltip color="danger" content="Deletar item">
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
