import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import CardWrapper from '@/components/auth/card-wrapper'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { authApi } from '@/lib/api'

const Verification = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const callbackUrl = searchParams.get('callbackUrl') || '/auth/login'

  const [code, setCode] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const refreshCode = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success('Resend code success')
    }, 3000)
  }

  const onContinue = () => {
    if (code?.length !== 6) return toast.error('Invalid code')
    setIsLoading(true)

    const data = {
      username: email,
      verification_code: code
    }

    authApi.post('/users/verify_email', data)
      .then(() => {
        setIsLoading(false)
        // navigate(callbackUrl)
        navigate('/auth/login')
        toast.success('Verification success')
      })
      .catch(err => {
        if (err.response.data.detail === 'Wrong token') {
          toast.error('Wrong verification code')
        } else {
          toast.error('Something went wrong')
        }
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <CardWrapper>
      <div className="flex flex-col justify-center items-center gap-y-6">
        <div className="flex flex-col justify-center items-center text-sm text-muted-foreground">
          <span>Enter the verification code sent to your email</span>
          <span>{email}</span>
        </div>

        <div className="flex flex-col gap-y-1">
          <InputOTP
            maxLength={6}
            value={code}
            disabled={isLoading}
            onChange={(value: string) => setCode(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => <InputOTPSlot key={index} index={index} />)}
            </InputOTPGroup>
          </InputOTP>

          <Button
            onClick={refreshCode}
            variant="link"
            disabled={isLoading}
            className="text-xs"
          >
            Didn't receive a code? Resend
          </Button>
        </div>

        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? <Loader /> : 'Continue'}
        </Button>
      </div>
    </CardWrapper>
  )
}

export default Verification
