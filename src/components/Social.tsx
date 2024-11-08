import { IconType } from 'react-icons'

type SocialProps = {
  url: string
  icon: IconType
}

export function Social({ url, icon: Icon }: SocialProps) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary duration-300 hover:bg-primary-500"
    >
      <Icon size={18} className="text-white" />
    </a>
  )
}
