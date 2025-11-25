import axios from 'axios'
import { log } from 'console'

const API_BASE_URL = 'http://localhost:8000/api'

export interface Product {
  _id?: string
  ID: number
  Title: string
  Category: string
  Price: number
  DiscountPercentage: number
  Stock: number
  Image?: string
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}

export const getProductPagination = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginationResponse<Product>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  const response = await axios.get(`${API_BASE_URL}/products?${params.toString()}`)
  return response.data
}

export const productApi = {
  getProducts: async (page = 1, pageSize = 10): Promise<{ products: Product[], hasMore: boolean, currentPage: number }> => {
    const response = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=${pageSize}`)
    console.log(response);
    
    return response.data
  },

  populateProducts: async (): Promise<{ message: string, count: number }> => {
    const response = await axios.post(`${API_BASE_URL}/products/populate`)
    return response.data
  },

  createProduct: async (productData: Omit<Product, '_id'>): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/products`, productData)
    return response.data
  },

  deleteProduct: async (id: string): Promise<{ message: string }> => {
    const response = await axios.delete(`${API_BASE_URL}/products/${id}`)
    return response.data
  },

  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData)
    return response.data
  }
}