import { z } from 'zod'

export const McqConfigSchema = z.object({
  questionNumber: z.string().min(1, {
    message: 'Please select question number'
  }),
  mode: z.string(),
  units: z.optional(
    z.array(z.string()).min(1, {
      message: 'Please select atleast 1 unit'
    })
  ),
  specificNeeds: z.optional(z.string())
})

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const RegisterSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  }),
  confirmPassword: z.string().min(1, {
    message: 'Comfirm password is required'
  })
})

export const ResetSchema = z.object({
  code: z.string().min(1, {
    message: 'Code is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  }),
  confirmPassword: z.string().min(1, {
    message: 'Comfirm password is required'
  })
})
