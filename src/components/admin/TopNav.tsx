import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'

import { getUserInfo } from '@/actions/userActions'

import { UserInfo } from './UserInfo'

export async function TopNav() {
  const userInfo = await getUserInfo()
  return (
    <Navbar className="shadow-medium" maxWidth="full">
      <NavbarContent justify="end">
        <NavbarItem>
          <UserInfo userInfo={userInfo} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
