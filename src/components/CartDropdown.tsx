'use client'

type CartDropdownProps = {
  isOpen: boolean
  onClose: () => void
  quantity: number
}

export function CartDropdown({ isOpen, quantity }: CartDropdownProps) {
  if (!isOpen) return null

  return <div>Quantidade aqui: {quantity}</div>
}
