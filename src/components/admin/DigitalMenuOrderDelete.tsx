'use client'

import { Button, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

import { deleteOrder } from '@/actions/DigitalMenuActions'

type MenuDigitalOrderDeleteProps = {
  id: string
}
export function DigitalMenuOrderDelete({ id }: MenuDigitalOrderDeleteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleDeleteDigitalMenuOrder() {
    await deleteOrder(id)
    setIsLoading(true)

    setTimeout(() => {
      router.refresh()
      setIsLoading(false)
    }, 3000)
  }
  return (
    <Tooltip color="danger" content="Deletar pedido">
      <Button
        className="min-w-fit cursor-pointer p-0 text-lg text-danger hover:!bg-transparent active:opacity-50"
        variant="light"
        isLoading={isLoading}
        onClick={handleDeleteDigitalMenuOrder}
      >
        {!isLoading && <FiTrash />}
      </Button>
    </Tooltip>
  )
}
