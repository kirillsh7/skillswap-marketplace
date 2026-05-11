import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email({ message: 'Неверный email' }),
  password: z.string().min(5, { message: 'Пароль должен быть не менее 5 символов' }),
})

export type LoginFormData = z.infer<typeof LoginSchema>
