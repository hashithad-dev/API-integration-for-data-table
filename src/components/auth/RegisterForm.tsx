import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'sonner'
import { useState } from 'react'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name too long'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user'], { message: 'Please select a role' })
  // password and confirmPassword REMOVED
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register: registerUser, isLoading } = useAuthStore()
  const [successMessage, setSuccessMessage] = useState('')
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user'
    }
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data.name, data.email, data.role)
      toast.success('Registration successful! Check your email for login credentials.')
      navigate('/login')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[600px] bg-white border border-gray-200 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Create your new account - Password will be sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Success message */}
          {successMessage && (
            <div className="px-3 py-2 text-sm text-green-600 border border-green-200 rounded bg-green-50">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your full name" 
                {...register('name')}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>
            
            {/* Info message about auto-generated password */}
            <div className="px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded bg-blue-50">
              📧 A secure password will be automatically generated and sent to your email
            </div>
            

            <Button type="submit" className="w-full theme-bg hover:theme-bg-dark text-white" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="text-center text-sm">
            <span>Already have an account? </span>
            <Button variant="link" className="p-0 h-auto theme-text hover:theme-bg-light" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}