'use client'

import { usePathname } from 'next/navigation'

import { getIdByParams, setAdminPageTitle } from '@/lib/utils'

import { Breadcrumb } from '../Breadcrumbs'

export function DashboardTitle() {
  const pathname = usePathname()
  const id = getIdByParams(pathname)
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold">
        {setAdminPageTitle(pathname, id)}
      </h1>

      <Breadcrumb pathname={pathname} id={id} />
    </div>
  )
}
