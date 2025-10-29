import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Types
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

// API functions
const fetchUsers = async (): Promise<User[]> => {
  // Mock data for demonstration
  const saved = localStorage.getItem('userData')
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const saved = localStorage.getItem('userData')
  const users = saved ? JSON.parse(saved) : []
  const newUser: User = {
    ...user,
    id: users.length === 0 ? '1' : String(Math.max(...users.map((u: User) => parseInt(u.id))) + 1)
  }
  const updatedUsers = [...users, newUser]
  localStorage.setItem('userData', JSON.stringify(updatedUsers))
  return newUser
}

const updateUser = async (user: User): Promise<User> => {
  const saved = localStorage.getItem('userData')
  const users = saved ? JSON.parse(saved) : []
  const updatedUsers = users.map((u: User) => u.id === user.id ? user : u)
  localStorage.setItem('userData', JSON.stringify(updatedUsers))
  return user
}

const deleteUser = async (id: string): Promise<void> => {
  const saved = localStorage.getItem('userData')
  const users = saved ? JSON.parse(saved) : []
  const updatedUsers = users.filter((u: User) => u.id !== id)
  localStorage.setItem('userData', JSON.stringify(updatedUsers))
}

// Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}