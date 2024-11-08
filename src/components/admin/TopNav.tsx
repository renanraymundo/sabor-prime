'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { BiChevronDown } from 'react-icons/bi'

export function TopNav() {
  return (
    <Navbar className="shadow-medium" maxWidth="full">
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger as="div" className="cursor-pointer">
              <div className="flex items-center">
                <span className="flex items-center gap-2">
                  <Avatar
                    isBordered
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  />
                  <span className="h-5">Johnny Silva</span>
                </span>
                <BiChevronDown className="text-secondary" />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="delete" className="text-danger" color="danger">
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
