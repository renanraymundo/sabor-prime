import { MdErrorOutline } from 'react-icons/md'

type ErrorMessageProps = {
  message: string | undefined
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="flex items-center gap-1">
      <MdErrorOutline size={14} className="flex-none" /> {message}
    </p>
  )
}
