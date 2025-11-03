import { z } from "zod"

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age must been 18+ required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Age must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required")
})

export type UserFormData = z.infer<typeof userSchema>