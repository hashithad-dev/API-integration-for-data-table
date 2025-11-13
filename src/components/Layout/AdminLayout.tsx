import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function AdminLayout() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
            credentials: 'include'
          })
          
          if (!response.ok) {
            useAuthStore.getState().logout()
            toast.error('Session expired. Please login again.')
            navigate('/login')
          }
        } catch (error) {
          useAuthStore.getState().logout()
          navigate('/login')
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAuthenticated, navigate])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}