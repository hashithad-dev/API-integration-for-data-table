import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export interface DatabaseUser {
  _id?: string
  firstName: string
  lastName: string
  age: string
  gender: string
  email: string
  phone: string
  dateOfBirth: string
}

export const databaseApi = {
  getUsers: async (): Promise<DatabaseUser[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`)
    return response.data
  },

  createUser: async (user: Omit<DatabaseUser, '_id'>): Promise<DatabaseUser> => {
    const response = await axios.post(`${API_BASE_URL}/users`, user)
    return response.data
  },

  updateUser: async (id: string, user: Omit<DatabaseUser, '_id'>): Promise<DatabaseUser> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user)
    return response.data
  },

  deleteUser: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/users/${id}`)
  }
}