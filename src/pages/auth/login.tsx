import { useEffect, useState } from 'react'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { useGoogleLogin } from '@react-oauth/google'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { CheckCheck, Eye, EyeOff } from 'lucide-react'

import { authApi } from '@/lib/api'
import { apiUrl } from '@/lib/constants'
import { LoginSchema } from '@/lib/schemas'
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
import axios from 'axios'
// import useCallbackUrl from '@/store/use-callback-url'

const Login = () => {
  const navigate = useNavigate()
  // const { setCallbackUrl } = useCallbackUrl()
  const [searchParams] = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  // setCallbackUrl(callbackUrl)
  const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID

  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // const getInstance = (instance: object) => {
  //   const captcha = instance;
  //   return captcha;
  // }

  // const captchaVerifyCallback = async (captchaVerifyParam: string) => {
  //   const response = await axios.post("/verify-captcha", captchaVerifyParam);
  //   if (response.data.success) {
  //     return {
  //       captchaResult: true,
  //     };
  //   } else {
  //     return {
  //       captchaResult: false,
  //     }
  //   }
  // }

  // const onBizResultCallback = () => {
  //   setIsVerified(true);
  // }

  // useEffect(() => {
  //   // @ts-expect-error : cdn functions
  //   window.initAliyunCaptcha({
  //     SceneId: "ukwzmi76",
  //     prefix: "k361y3", // 身份标
  //     mode: "popup",
  //     element: "#captcha-element",
  //     button: "#captcha-button",
  //     captchaVerifyCallback: captchaVerifyCallback,
  //     onBizResultCallback: onBizResultCallback,
  //     getInstance: getInstance,
  //     slideStyle: {
  //       width: 360,
  //       height: 40,
  //     },
  //     language: "cn",
  //   });
  //   return () => {
  //     document.getElementById("aliyunCaptcha-mask")?.remove();
  //     document.getElementById("aliyunCaptcha-window-popup")?.remove();
  //   };
  // }, [])

  // const onGoogleLogin = useGoogleLogin({
  //   onSuccess: tokenResponse => {
  //     console.log('google login', tokenResponse)
  //     if (!tokenResponse) return toast.error('Google login failed')

  //     navigate('/')
  //     localStorage.setItem('google_access_token', tokenResponse.access_token)
  //   },
  //   onError: () => toast.error('Google login failed')
  // })

  // const onGoogleLogin = async () => {
  //   const res = await axios.get(`${apiUrl}/users/google/login`)
  //   console.log('google login', res)
  //   if (!res) return toast.error('Something went wrong')
  //   const callback = await axios.get(`${apiUrl}/users/google/callback`)
  //   console.log('google callback', callback)
  // }

  // const onGithubLogin = async () => {
  //   // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
  //   // const res = await axios.get(`https://github.com/login/oauth/authorize?client_id=${githubClientId}`)
  //   window.location.assign(`https://github.com/login/oauth/authorize?client_id=${githubClientId}`)
  // }

  const onGithubLogin = async () => {
    window.location.assign(`${apiUrl}/users/github/login`)
  }

  const onForgot = async () => {
    const email = form.getValues('email')
    if (!email) return toast.error('Input email first')

    await onResend(email)
    navigate(`/auth/reset?email=${email}`)
    toast.success('Code already sent to email')
  }

  const onResend = async (email: string) => {
    const res = await authApi.post('/users/resend_email/', { username: email })
    if (!res) return toast.error('Something went wrong')
    toast.success('Code already sent to email')
  }

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true)

    const data = {
      username: values.email,
      password: values.password
    }

    axios.post(`${apiUrl}/users/login`, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => {
        !callbackUrl ? navigate('/') : navigate(callbackUrl)
        localStorage.setItem('access_token', `Bearer ${res.data.access_token}`)
      })
      .catch(async (err) => {
        if (err.response.data.detail === 'Email not verified') {
          !callbackUrl
            ? navigate(`/auth/verification?email=${values.email}`)
            : navigate(`/auth/verification?email=${values.email}&callbackUrl=${callbackUrl}`)

          onResend(values.email)
        } else if (err.response.data.detail === 'Incorrect username or password') {
          toast.error('Wrong credentials')
        }else {
          toast.error('Something went wrong')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <CardWrapper
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
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
                  <div className="flex justify-between items-center">
                    <FormLabel>Password</FormLabel>

                    <Button
                      onClick={onForgot}
                      variant="link"
                      className="h-6 p-0 text-xs text-muted-foreground"
                    >
                      Forgot password?
                    </Button>
                  </div>

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
          </div>

          <div className="space-y-4">
            {/* {isVerified && (
              <div className="flex items-center gap-x-2 p-3 rounded-md bg-emerald-500/50 text-sm text-emerald-500">
                <CheckCheck className="w-4 h-4" />
                <p>Verify success</p>
              </div>
            )}

            {!isVerified && (
              <Button type="button" variant="outline" className="captcha-a w-full">
                <div id="captcha-button">Click to verify</div>
              </Button>
            )} */}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader /> : 'Login'}
            </Button>

            <div className="flex items-center text-muted-foreground">
              <span className="flex-1 h-[1px] bg-black/60" />
              <span className='px-2 text-xs'>OR DIRECT USING</span>
              <span className="flex-1 h-[1px] bg-black/60" />
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <Button
                // onClick={() => onGoogleLogin()}
                asChild
                variant="outline"
                disabled={isLoading}
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <FcGoogle className="w-4 h-4" />
                  <span>Google</span>
                </div>
              </Button>

              {/* <GoogleLogin onSuccess={onGoogleLogin} /> */}

              <Button
                onClick={onGithubLogin}
                asChild
                variant="outline"
                disabled={isLoading}
                className="flex-1 cursor-pointer"
              >
                <div className="flex items-center gap-x-4">
                  <FaGithub className="w-4 h-4" />
                  <span>Github</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default Login
