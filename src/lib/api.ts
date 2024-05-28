import { toast } from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    let token = localStorage.getItem('access_token')

    if (!token) window.location.href = '/auth/login'

    if (token) {
      const decodedToken = jwtDecode(token)
      
      if (decodedToken?.exp && decodedToken?.exp * 1000 < Date.now()) {
        localStorage.removeItem('access_token')
        window.location.href = `/auth/login`
      } else {
        config.headers.Authorization = token || ''
      }
    }

    return config
  },
  err => {
    toast.error('Something went wrong')
    return Promise.reject(err)
  }
)
