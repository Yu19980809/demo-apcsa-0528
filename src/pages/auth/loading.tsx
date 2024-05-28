import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { authApi } from '@/lib/api'
// import useCallbackUrl from '@/store/use-callback-url'

const AuthLoading = () => {
  const navigate = useNavigate()
  // const { callbackUrl } = useCallbackUrl()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) return

    authApi.get(`/users/github/callback?code=${code}`)
      .then(res => {
        localStorage.setItem('access_token', `Bearer ${res.data.access_token}`)
        navigate('/')
        // navigate(callbackUrl || '/')
      })
      .catch(() => {
        toast.error('Something went wrong')
        navigate('/auth/login')
        // !callbackUrl ?  navigate('/auth/login') : navigate(`/auth/login?callbackUrl=${callbackUrl}`)
      })

  }, [code])

  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-screen bg-black/80 text-white">
      <Loader2 className="w-10 h-10 animate-spin" />
      <p>Loading...</p>
    </div>
  )
}

export default AuthLoading
