import { ReactNode } from 'react'

import { DashboardTitle } from '@/components/admin/DashboardTitle'
import { Sidebar } from '@/components/admin/Sidebar'
import { TopNav } from '@/components/admin/TopNav'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex overflow-hidden">
      <Sidebar />
      <section className="flex-1">
        <TopNav />
        <div className="p-4">
          <DashboardTitle />
          {children}
        </div>
      </section>
    </main>
  )
}
