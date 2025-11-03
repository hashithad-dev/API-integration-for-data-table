import axios from 'axios'

export interface PaymentUser {
  id: number
  title: string
  category: string
  price: number
  discountPercentage: number
  stock: number
}

export const fetchPaymentUsers = async (): Promise<PaymentUser[]> => {
  const response = await axios.get("https://dummyjson.com/products")
  
  return response.data.products.map((product: any) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
  }))
}