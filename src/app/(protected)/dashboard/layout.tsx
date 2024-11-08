'use client'

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Sidebar } from '@/components/admin/Sidebar'
import { TopNav } from '@/components/admin/TopNav'
import { setAdminBreadcrumbs, setAdminPageTitle } from '@/lib/utils'

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <main className="flex overflow-hidden">
      <Sidebar />
      <section className="flex-1">
        <TopNav />
        <div className="p-4">
          <div className="mb-4">
            <h1 className="text-3xl">{setAdminPageTitle(pathname)}</h1>
            <Breadcrumbs
              itemClasses={{
                item: 'text-slate-500 data-[current="true"]:text-secondary',
              }}
            >
              <BreadcrumbItem>Home</BreadcrumbItem>

              {setAdminBreadcrumbs(pathname).map((breadcrumb) => (
                <BreadcrumbItem key={breadcrumb}>{breadcrumb}</BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          {children}
        </div>
      </section>
    </main>
  )
}
