import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { databaseApi, DatabaseUser } from '../api/databaseApi'

export const useDatabaseUsers = () => {
  const queryClient = useQueryClient()

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['database-users'],
    queryFn: databaseApi.getUsers
  })

  const createUserMutation = useMutation({
    mutationFn: databaseApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['database-users'] })
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: string; user: Omit<DatabaseUser, '_id'> }) =>
      databaseApi.updateUser(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['database-users'] })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: databaseApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['database-users'] })
    }
  })

  return {
    data,
    isLoading,
    error,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation
  }
}