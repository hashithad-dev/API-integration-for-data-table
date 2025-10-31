import { useQuery } from '@tanstack/react-query'

export interface PaymentUser {
  id: number
  firstName: string
  lastName: string
  age: number
  gender: string
  email: string
  phone: string
  dateOfBirth: string
}

const fetchPaymentUsers = async (): Promise<PaymentUser[]> => {
  const response = await fetch("https://dummyjson.com/users?limit=200")
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  
  const json = await response.json()
  return json.users.map((u: any) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    age: u.age,
    gender: u.gender,
    email: u.email,
    phone: u.phone,
    dateOfBirth: u.birthDate || '1990-01-01',
  }))
}

export const usePaymentUsers = () => {
  return useQuery({
    queryKey: ['payment-users'],
    queryFn: fetchPaymentUsers,
  })
}