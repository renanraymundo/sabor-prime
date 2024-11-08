'use client'

import {
  Button,
  Modal as ModalComponent,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoAlertCircleOutline } from 'react-icons/io5'

import { useCart } from '@/providers/CartProvider'

export type MenuDigitalOrderItem = {
  id: string
  quantity: number
}

type ModalProps = {
  isOpen: boolean
}

export default function Modal({ isOpen }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { clearCart } = useCart()
  const router = useRouter()

  async function handleFinishOrder() {
    setIsSubmitting(true)

    setTimeout(() => {
      router.push('/')
      clearCart()
    }, 3000)
  }

  return (
    <ModalComponent
      closeButton={false}
      backdrop="opaque"
      isOpen={isOpen}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-slate-900 to-slate-900/10 backdrop-opacity-20',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center">
              <h1 className="text-center text-2xl font-normal text-slate-600">
                Pedido enviado!
              </h1>
            </ModalHeader>
            <ModalBody>
              <p className="text-center text-xl font-normal leading-5">
                Seu pedido foi enviado com sucesso.
                <br />
                Um representante entrará em contato para confirmar a entrega e o
                pagamento. <br />
                Você receberá uma mensagem no WhatsApp com os detalhes do pedido
                e o número do protocolo.
              </p>
            </ModalBody>
            <ModalFooter className="flex items-center justify-between max-sm:flex-col">
              <a
                href="https://api.whatsapp.com/send?phone=5519982241115&text=Olá!%20Solicitei%20meu%20kit%20e%20não%20recebi%20as%20informações%20em%20meu%20WhatsApp.%20Poderia%20me%20ajudar?"
                className="flex items-center gap-1 text-danger underline"
                target="_blank"
              >
                <IoAlertCircleOutline size={20} />
                <span className="h-5">
                  Não recebi as informações no meu WhatsApp
                </span>
              </a>
              <Button
                color="danger"
                variant="solid"
                onPress={onClose}
                className="font-normal"
                size="lg"
                onClick={handleFinishOrder}
                isLoading={isSubmitting}
              >
                <span className="h-5">Fechar</span>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalComponent>
  )
}
