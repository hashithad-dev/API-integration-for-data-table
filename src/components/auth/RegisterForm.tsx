import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaUser, FaUpload } from 'react-icons/fa'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'You must agree to terms')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

export default function RegisterForm() {
  const navigate = useNavigate()
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateField = (fieldName: string, value: any) => {
    try {
      const fieldSchema = registerSchema.shape[fieldName as keyof typeof registerSchema.shape]
      if (fieldSchema) {
        fieldSchema.parse(value)
        setErrors(prev => ({ ...prev, [fieldName]: '' }))
      }
      
      // Special case for confirmPassword
      if (fieldName === 'confirmPassword' || fieldName === 'password') {
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
        } else {
          setErrors(prev => ({ ...prev, confirmPassword: '' }))
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [fieldName]: error.errors[0].message }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      registerSchema.parse(formData)
      setErrors({})
      console.log('Registration successful', { ...formData, profileImage })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer">
                <FaUpload className="w-3 h-3" />
              </label>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input 
                id="name" 
                type="text" 
                placeholder="Enter your full name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onBlur={() => validateField('name', formData.name)}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                onBlur={() => validateField('email', formData.email)}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                onBlur={() => validateField('password', formData.password)}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                onBlur={() => validateField('confirmPassword', formData.confirmPassword)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.terms}
                onCheckedChange={(checked) => setFormData({...formData, terms: !!checked})}
              />
              <label htmlFor="terms" className="text-sm font-normal">
                I agree to the terms and conditions
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms}</p>}
            <Button type="submit" className="w-full" size="lg">
              Create Account
            </Button>
          </form>
          <div className="text-center text-sm">
            <span>Already have an account? </span>
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}