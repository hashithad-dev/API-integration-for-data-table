import { useQuery } from '@tanstack/react-query'
import { productApi } from '../api/productApi'

export const useProducts = (page: number, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['products', page, pageSize],
    queryFn: () => productApi.getProducts(page, pageSize),
  })
}