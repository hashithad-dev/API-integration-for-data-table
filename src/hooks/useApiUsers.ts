import { useQuery } from '@tanstack/react-query'
import { fetchPaymentUsers } from '../api/products'

export const useApiUsers = () => {
  return useQuery({
    queryKey: ['api-users'],
    queryFn: fetchPaymentUsers,
  })
}