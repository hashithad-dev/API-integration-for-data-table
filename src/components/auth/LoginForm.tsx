import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </label>
          </div>
          <Button className="w-full" size="lg">
            Sign In
          </Button>

          <div className="text-center text-sm">
            <Button variant="link" className="p-0 h-auto">
              Forgot your password?
            </Button>
          </div>
          <div className="text-center text-sm">
            <span>Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/register')}>
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}