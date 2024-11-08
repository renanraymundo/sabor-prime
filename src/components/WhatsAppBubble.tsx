import { FaWhatsapp } from 'react-icons/fa'

export function WhatsAppBubble() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5519982241115&text=Ola!%20Gostaria%20de%20mais%20informações%20sobre%20as%20refeições%20congeladas."
      target="_blank"
      className="fixed bottom-4 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366]"
    >
      <FaWhatsapp size={50} color="white" />
    </a>
  )
}
