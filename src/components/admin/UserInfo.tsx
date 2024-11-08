'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { BiChevronDown } from 'react-icons/bi'

import { signOutUser } from '@/actions/authActions'

export type UserInfoProps = {
  userInfo: {
    name: string | null
    image: string
  } | null
}

export function UserInfo({ userInfo }: UserInfoProps) {
  if (!userInfo) return

  return (
    <Dropdown>
      <DropdownTrigger as="div" className="cursor-pointer">
        <div className="flex items-center">
          <span className="flex items-center gap-2">
            <Avatar isBordered src={userInfo.image} />
            <span className="h-5">{userInfo.name}</span>
          </span>
          <BiChevronDown className="text-secondary" />
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={async () => signOutUser()}
        >
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
