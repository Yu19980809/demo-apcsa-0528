import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { jwtDecode } from 'jwt-decode'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkToken = (callbackUrl: string) => {
  let token = localStorage.getItem('access_token')
  if (!token) return window.location.href = `/auth/login?callbackUrl=${callbackUrl}`

  const decodedToken = jwtDecode(token)
  if (decodedToken?.exp && decodedToken?.exp * 1000 < Date.now()) {
    localStorage.removeItem('access_token')
    window.location.href = `/auth/login?callbackUrl=${callbackUrl}`
  }
}
