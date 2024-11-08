'use client'

import { usePathname } from 'next/navigation'

import { setAdminPageTitle } from '@/lib/utils'

import { Breadcrumb } from '../Breadcrumbs'

export function DashboardTitle() {
  const pathname = usePathname()
  return (
    <div className="mb-4">
      <h1 className="text-3xl">{setAdminPageTitle(pathname)}</h1>

      <Breadcrumb pathname={pathname} />
    </div>
  )
}
