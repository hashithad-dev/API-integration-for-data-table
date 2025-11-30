import axios from 'axios'

export interface PaymentUser {
  id: number
  title: string
  category: string
  price: number
  discountPercentage: number
  stock: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const fetchPaymentUsers = async (): Promise<PaymentUser[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/products`)
  
  return response.data.products.map((product: any) => ({
    id: product.ID || product.id,
    title: product.Title || product.title,
    category: product.Category || product.category,
    price: product.Price || product.price,
    discountPercentage: product.DiscountPercentage || product.discountPercentage,
    stock: product.Stock || product.stock,
  }))
}