import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from './useUsers'

const restoreUser = async (user: User): Promise<User> => {
  const saved = localStorage.getItem('userData')
  const users = saved ? JSON.parse(saved) : []
  const updatedUsers = [...users, user]
  localStorage.setItem('userData', JSON.stringify(updatedUsers))
  return user
}

export const useRestoreUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: restoreUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}