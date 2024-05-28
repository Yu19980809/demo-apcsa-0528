import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { z } from 'zod'

import { apiUrl } from '@/lib/constants'
import { RegisterSchema } from '@/lib/schemas'
import CardWrapper from '@/components/auth/card-wrapper'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const Register = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit =  (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true)
    console.log('values', values)

    if (values.password !== values.confirmPassword) {
      toast.error('Two password are not same')
      setIsLoading(false)
      return
    }

    const data = {
      username: values.email,
      password: values.password
    }

    axios.post(`${apiUrl}/users/signup`, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(() => {
        toast.success('Code already sent to email')

        !callbackUrl
          ? navigate(`/auth/verification?email=${values.email}`)
          : navigate(`/auth/verification?email=${values.email}&callbackUrl=${callbackUrl}`)
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))

    // setTimeout(() => {
    //   toast.success('Code already sent to email')

    //   !callbackUrl
    //     ? navigate(`/auth/verification?email=${values.email}`)
    //     : navigate(`/auth/verification?email=${values.email}&callbackUrl=${callbackUrl}`)
    // }, 3000)
  }

  return (
    <CardWrapper
      backButtonLabel="Already have an account? Sign in"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      disabled={isLoading}
                      placeholder="hello@example.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPwd ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="******"
                        {...field}
                      />

                      {showPwd ? (
                        <Eye
                          onClick={() => setShowPwd(false)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setShowPwd(true)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPwd ? 'text' : 'password'}
                        disabled={isLoading}
                        placeholder="******"
                        {...field}
                      />

                      {showConfirmPwd ? (
                        <Eye
                          onClick={() => setShowConfirmPwd(false)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      ) : (
                        <EyeOff
                          onClick={() => setShowConfirmPwd(true)}
                          className="absolute top-3 right-2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary"
                        />
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader /> : 'Register'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default Register
