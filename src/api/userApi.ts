import { User } from '../store/userStore'

const API_BASE = 'http://localhost:8000/api/users'

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(API_BASE)
    const users = await response.json()
    return users.map((user: any) => ({
      id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      age: user.age.toString(),
      gender: user.gender || '',
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateofbirth
    }))
  },

  createUser: async (user: Omit<User, 'id'>): Promise<any> => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: user.firstName,
        lastname: user.lastName,
        age: parseInt(user.age),
        dateofbirth: user.dateOfBirth,
        email: user.email,
        phone: user.phone
      })
    })
    const created = await response.json()
    return {
      id: created._id,
      firstName: created.firstname,
      lastName: created.lastname,
      age: created.age.toString(),
      gender: user.gender,
      email: created.email,
      phone: created.phone,
      dateOfBirth: created.dateofbirth,
      message: created.message
    }
  },

  updateUser: async (user: User): Promise<any> => {
    const response = await fetch(`${API_BASE}/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: user.firstName,
        lastname: user.lastName,
        age: parseInt(user.age),
        dateofbirth: user.dateOfBirth,
        email: user.email,
        phone: user.phone
      })
    })
    const updated = await response.json()
    return {
      id: updated._id,
      firstName: updated.firstname,
      lastName: updated.lastname,
      age: updated.age.toString(),
      gender: user.gender,
      email: updated.email,
      phone: updated.phone,
      dateOfBirth: updated.dateofbirth,
      message: updated.message
    }
  },

  deleteUser: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    const result = await response.json()
    return result
  }
}