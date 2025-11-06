import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserStore, User } from '../store/userStore'
import { userApi } from '../api/userApi'

export const useHybridUsers = () => {
  const { users, setUsers, addUser, updateUser, deleteUser, restoreUser } = useUserStore()
  const queryClient = useQueryClient()

  // Fetch from API and sync with Zustand
  const { data: apiUsers = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers
  })

  // Sync API data with Zustand only on initial load
  React.useEffect(() => {
    if (apiUsers.length > 0 && users.length === 0) {
      setUsers(apiUsers)
    }
  }, [apiUsers, setUsers, users.length])

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (newUser) => {
      addUser(newUser)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (updatedUser) => {
      updateUser(updatedUser)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (_, deletedId) => {
      deleteUser(deletedId)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  // Restore user mutation
  const restoreUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (restoredUser) => {
      restoreUser(restoredUser)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  return {
    data: users,
    isLoading,
    error,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    restoreUserMutation
  }
}