// import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'

import Home from '@/pages/home'
import Exam from '@/pages/exam'
import Learn from '@/pages/learn'
import Login from './pages/auth/login'
import Reset from '@/pages/auth/reset'
import Stars from '@/pages/user/stars'
import ExamMcq from '@/pages/exam/mcq'
import ExamFrq from '@/pages/exam/frq'
import Settings from '@/pages/settings'
import History from '@/pages/user/history'
import Register from '@/pages/auth/register'
import Learning from '@/pages/user/learning'
import UserProfile from '@/pages/user/profile'
import AuthLoading from '@/pages/auth/loading'
import Knowledge from '@/pages/learn/knowledge'
import ExamUnfinish from '@/pages/exam/unfinish'
import FrqTable from '@/pages/practice/frq-table'
import McqConfig from '@/pages/practice/mcq-config'
import Verification from '@/pages/auth/verification'
import FrqQuestion from '@/pages/practice/frq-question'
import McqQuestion from '@/pages/practice/mcq-question'
import { ThemeProvider } from '@/components/providers/theme-provider'

import '@/index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'auth/login',
    element: (
      <GoogleOAuthProvider clientId={googleClientId}>
        <Login />
      </GoogleOAuthProvider>
    )
  },
  {
    path: 'auth/register',
    element: <Register />
  },
  {
    path: 'auth/reset',
    element: <Reset />
  },
  {
    path: 'auth/verification',
    element: <Verification />
  },
  {
    path: 'auth/loading',
    element: <AuthLoading />
  },
  {
    path: 'settings',
    element: <Settings />
  },
  {
    path: 'user/profile',
    element: <UserProfile />
  },
  {
    path: 'user/stars',
    element: <Stars />
  },
  {
    path: 'user/learning',
    element: <Learning />
  },
  {
    path: 'user/history',
    element: <History />
  },
  {
    path: 'learn',
    element: <Learn />
  },
  {
    path: 'learn/knowledge/:id',
    element: <Knowledge />
  },
  {
    path: 'exam',
    element: <Exam />
  },
  {
    path: 'exam/unfinish',
    element: <ExamUnfinish />
  },
  {
    path: 'exam/:id/frq',
    element: <ExamFrq />
  },
  {
    path: 'exam/:id/mcq',
    element: <ExamMcq />
  },
  {
    path: 'practice/frq/table',
    element: <FrqTable />
  },
  {
    path: 'practice/frq/question/:id',
    element: <FrqQuestion />
  },
  {
    path: 'practice/mcq/config',
    element: <McqConfig />
  },
  {
    path: 'practice/mcq/questions',
    element: <McqQuestion />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </ThemeProvider>
  // </React.StrictMode>
)
