import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface User {
  id: string
  firstName: string
  lastName: string
  age: string
  gender: string
  email: string
  phone: string
  dateOfBirth: string
}

interface UserStore {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (user: User) => void
  deleteUser: (id: string) => void
  restoreUser: (user: User) => void
}

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY 

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (user) => set((state) => ({
        users: state.users.map(u => u.id === user.id ? user : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      })),
      restoreUser: (user) => set((state) => ({ users: [...state.users, user] }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)