'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Shield, Stethoscope, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { appName } from '@/constants/constants'
// import { showToast } from '@/lib/toast'
import { Toaster } from '@/components/ui/sonner'
// import { LoginRequest } from '@/types/auth.types'
// import { authService } from '@/lib/api/client'
// import { useRouter } from 'next/navigation'

const LoginPage = () => {
  // const router=useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    username: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // try {
    //   // Simulate API call
    //   const credentials: LoginRequest = {
    //     username: formData.username,
    //     password: formData.password
    //   }
    //   const response = await authService.login(credentials);
    //   console.log(response.data, 'login')
    //   showToast.success({
    //     title: 'Login Success',
    //     description: response.message,
    //   });
    //   router.push('/')
    // } catch (err) {

    //   const errorMessage = err instanceof Error ? err.message : 'Invalid Credentials. Please try again.';
    //   setError(errorMessage);
    //   showToast.error({
    //     title: 'Error Login',
    //     description: errorMessage
    //   })
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Stethoscope className="h-12 w-12" />
              <h1 className="text-4xl font-bold">{appName}</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-md mx-auto dark:text-accent-foreground">
              Your trusted healthcare companion for better health management
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-white/60 dark:bg-accent backdrop-blur-sm rounded-xl shadow-sm">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800  dark:text-accent-foreground">Secure & Private</h3>
                <p className="text-sm text-gray-600  dark:text-accent-foreground">Your health data is protected with enterprise-grade security</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white/60 dark:bg-accent backdrop-blur-sm rounded-xl shadow-sm">
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800  dark:text-accent-foreground">Expert Care Team</h3>
                <p className="text-sm text-gray-600  dark:text-accent-foreground">Connect with qualified healthcare professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-md   backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="flex lg:hidden items-center justify-center space-x-2 text-blue-600 mb-4">
                <Stethoscope className="h-8 w-8" />
                <h1 className="text-2xl font-bold">{appName}</h1>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-accent-foreground">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 dark:text-accent-foreground">
                Sign in to access your healthcare dashboard
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-600">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-accent-foreground">
                    User Name
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="name"
                    placeholder="Jhon Doe"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-accent-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-11 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end mb-4">
                  {/* <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div> */}
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage