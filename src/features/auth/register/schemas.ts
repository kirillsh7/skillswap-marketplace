import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.email({ message: 'Неверный email' }),
    password: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
    confirmPassword: z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof RegisterSchema>
