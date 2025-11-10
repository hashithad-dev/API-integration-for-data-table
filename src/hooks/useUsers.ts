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
const API_BASE = 'http://localhost:8000/api/users'

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_BASE)
  const users = await response.json()
  return users.map((user: any) => ({
    id: user._id,
    firstName: user.firstname,
    lastName: user.lastname,
    age: user.age.toString(),
    gender: user.gender || '',
    email: user.email,
    phone: user.phone,
    dateOfBirth: user.dateofbirth
  }))
}

const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: user.firstName,
      lastname: user.lastName,
      age: parseInt(user.age),
      dateofbirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone
    })
  })
  const created = await response.json()
  return {
    id: created._id,
    firstName: created.firstname,
    lastName: created.lastname,
    age: created.age.toString(),
    gender: user.gender,
    email: created.email,
    phone: created.phone,
    dateOfBirth: created.dateofbirth
  }
}

const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`${API_BASE}/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: user.firstName,
      lastname: user.lastName,
      age: parseInt(user.age),
      dateofbirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone
    })
  })
  const updated = await response.json()
  return {
    id: updated._id,
    firstName: updated.firstname,
    lastName: updated.lastname,
    age: updated.age.toString(),
    gender: user.gender,
    email: updated.email,
    phone: updated.phone,
    dateOfBirth: updated.dateofbirth
  }
}

const deleteUser = async (id: string): Promise<void> => {
  await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
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