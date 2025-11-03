import { useQuery } from '@tanstack/react-query'
import { fetchPaymentUsers } from '../api/users'

export const useApiUsers = () => {
  return useQuery({
    queryKey: ['api-users'],
    queryFn: fetchPaymentUsers,
  })
}