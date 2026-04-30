import { z } from 'zod'

export const RegisterSchema = z.object({
  // role: z.string(),
  // fullName: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export type RegisterFormData = z.infer<typeof RegisterSchema>
