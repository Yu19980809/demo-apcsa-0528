import { useState } from 'react'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Eye, EyeOff, Vault } from 'lucide-react'

import { ResetSchema } from '@/lib/schemas'
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
import { authApi } from '@/lib/api'

const Reset = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/auth/login'
  const email = searchParams.get('email')

  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onResend = () => {
    toast.success('Resend code success')
  }

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    if (values.password !== values.confirmPassword) return toast.error('Two password are not same')
    setIsLoading(true)

    const data = {
      username: email,
      password: values.password,
      verification_code: values.code
    }

    authApi.post('/users/reset_password', data)
      .then(() => {
        navigate(callbackUrl)
        toast.success('Reset password success')
      })
      .catch(async (err) => {
        if (err.response.data.detail === 'Wrong token') {
          toast.error('Wrong verification code')
        } else {
          toast.error('Something went wrong')
        }
      })
      .finally(() => setIsLoading(false))

    // setTimeout(() => {
    //   setIsLoading(false)
    //   toast.success('Reset password success')
    //   navigate(callbackUrl)
    // }, 3000)
  }

  return (
    <CardWrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>

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

            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Verification Code</FormLabel>

                    <Button
                      onClick={onResend}
                      variant="link"
                      className="h-6 p-0 text-xs text-muted-foreground"
                    >
                      Resend code
                    </Button>
                  </div>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="123456"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? <Loader /> : 'Reset'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default Reset
