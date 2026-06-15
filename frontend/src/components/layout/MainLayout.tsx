import { Outlet } from 'react-router-dom'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { useLocation } from 'react-router-dom'

export function MainLayout() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute && <AnnouncementBar />}
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}
