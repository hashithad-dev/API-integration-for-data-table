import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  photo?: string
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  register: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  updateProfile: (name: string, email: string, photo?: string) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
}

const API_URL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name, email, password })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Registration failed')
          }

          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Login failed')
          }

          const data = await response.json()
          set({ user: data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
          })
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({ user: null, isAuthenticated: false })
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          const response = await fetch(`${API_URL}/api/auth/me`, {
            credentials: 'include'
          })

          if (response.ok) {
            const data = await response.json()
            set({ user: data.user, isAuthenticated: true, isLoading: false })
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      updateProfile: async (name: string, email: string, photo?: string) => {
        const currentUser = get().user
        if (!currentUser) throw new Error('No user logged in')
        
        console.log('Frontend sending:', { 
          name, 
          email, 
          photo: photo ? `${photo.substring(0, 50)}...` : 'no photo',
          photoLength: photo?.length 
        })
        
        try {
          const requestBody = { name, photo }
          console.log('Request body:', requestBody)
          
          const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(requestBody)
          })
          
          console.log('Profile update response:', response.status, response.statusText)
          
          if (response.ok) {
            const data = await response.json()
            console.log('Profile updated successfully:', data)
            set({ user: { ...data.user } })
          } else {
            const errorText = await response.text()
            console.error('Profile update failed:', response.status, errorText)
            throw new Error(`Profile update failed: ${response.status} ${errorText}`)
          }
        } catch (error) {
          console.error('Profile update error:', error)
          throw error
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        try {
          const response = await fetch(`${API_URL}/api/auth/change-password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ currentPassword, newPassword })
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Password change failed')
          }
        } catch (error) {
          throw error
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)