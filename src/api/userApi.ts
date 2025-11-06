import { User } from '../store/userStore'

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'user-storage'

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    // Get data from Zustand storage
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : { state: { users: [] } }
    return data.state?.users || []
  },

  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : { state: { users: [] } }
    const existingUsers = data.state?.users || []
    
    const maxId = existingUsers.length > 0 
      ? Math.max(...existingUsers.map((u: User) => parseInt(u.id) || 0))
      : 0
    
    const newUser = { ...user, id: (maxId + 1).toString() }
    return newUser
  },

  updateUser: async (user: User): Promise<User> => {
    return user
  },

  deleteUser: async (id: string): Promise<string> => {
    return id
  }
}