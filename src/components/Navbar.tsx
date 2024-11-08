'use client'

import {
  cn,
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'

import { Cart } from './Cart'
import { Logo } from './Logo'
import { Social } from './Social'

type NavbarItemProps = {
  id: string
  title: string
  path: string
}

type NavbarSocialProps = {
  id: string
  url: string
  title: string
  icon: IconType
}

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const items: NavbarItemProps[] = [
    {
      id: '0',
      title: 'Página Inicial',
      path: '/',
    },
    {
      id: '1',
      title: 'Sobre nós',
      path: '/sobre-nos',
    },
  ]

  const socials: NavbarSocialProps[] = [
    {
      id: '0',
      url: 'https://www.facebook.com/share/3A48sDs5PcQBVHNq/',
      title: 'Facebook',
      icon: FaFacebookF,
    },
    {
      id: '1',
      url: 'https://www.instagram.com/saborprimes/profilecard/?igsh=YWZycWp4czhwMWVt',
      title: 'Instagram',
      icon: FaInstagram,
    },
  ]

  function handleCloseNavbarMenu() {
    setIsMenuOpen(false)
  }

  return (
    <NavbarComponent
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      height={100}
      className="shadow-medium"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[4px]',
          'data-[active=true]:after:bg-secondary-100',
        ],
      }}
    >
      <NavbarContent>
        <NavbarBrand className="max-sm:hidden">
          <Logo />
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarContent justify="center" className="sm:hidden">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {items.map((item) => (
          <NavbarItem key={item.id} isActive={pathname === item.path && true}>
            <Link
              href={item.path}
              className={cn(
                'text-xl font-normal',
                pathname === item.path
                  ? 'text-secondary-100'
                  : 'text-slate-400',
              )}
            >
              {item.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as="ul" className="flex items-center gap-2">
          {socials.map((item) => (
            <li key={item.id}>
              <Social url={item.url} icon={item.icon} />
            </li>
          ))}
        </NavbarItem>
        <Cart />
      </NavbarContent>

      <NavbarMenu className="items-center">
        {items.map((item) => (
          <NavbarMenuItem key={item.id} onClick={handleCloseNavbarMenu}>
            <Link
              className={cn(
                'w-full',
                pathname === item.path ? 'text-primary' : 'text-slate-500',
              )}
              href={item.path}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarComponent>
  )
}
