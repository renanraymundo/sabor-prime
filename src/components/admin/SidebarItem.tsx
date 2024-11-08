import { cn } from '@nextui-org/react'
import Link from 'next/link'
import { IconType } from 'react-icons'

import { subItemsProps } from './Sidebar'

type SidebarItemProps = {
  icon: IconType
  name: string
  path: string
  pathname: string
  items: subItemsProps[]
}

export function SidebarItem({
  icon: Icon,
  name,
  path,
  pathname,
  items,
}: SidebarItemProps) {
  return items.length ? (
    <div className="text-xl">
      <span
        className={cn(
          'flex h-5 items-center gap-1',
          pathname.includes(path) && pathname !== '/dashboard'
            ? 'text-primary'
            : 'text-slate-500',
        )}
      >
        <Icon size={22} />
        {name}
      </span>
      <ul className="ml-6 mt-2 list-disc space-y-1">
        {items.map((subitem) => (
          <li
            key={subitem.id}
            className={cn(
              'text-base hover:text-secondary',
              pathname === subitem.path ? 'text-secondary' : 'text-slate-400',
            )}
          >
            <Link href={subitem.path}>{subitem.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Link href={path}>
      <span
        className={cn(
          'text-xl',
          pathname === path ? 'text-primary' : 'text-slate-500',
          'flex h-5 items-center gap-1',
        )}
      >
        <Icon size={22} />

        {name}
      </span>
    </Link>
  )
}
