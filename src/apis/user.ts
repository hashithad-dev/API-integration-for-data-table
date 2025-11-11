// import axios from 'axios'

// export interface Product {
//   id: number
//   title: string
//   category: string
//   price: number
//   discountPercentage: number
//   stock: number
// }

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dummyjson.com'

// export const fetchProducts = async (): Promise<Product[]> => {
//   const response = await axios.get(`${API_BASE_URL}/products`)
  
//   return response.data.products.map((product: any) => ({
//     id: product.id,
//     title: product.title,
//     category: product.category,
//     price: product.price,
//     discountPercentage: product.discountPercentage,
//     stock: product.stock,
//   }))
// }