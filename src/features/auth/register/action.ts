'use server'
import { LoginSchema, type LoginFormData } from './shemas'
import { signIn } from 'next-auth/react'

export async function loginAction(data: LoginFormData) {
  const validated = LoginSchema.safeParse(data)

  if (!validated.success) {
    error: validated.error.flatten().fieldErrors
  }
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
    })
    return {
      success: true,
    }
  } catch {
    return { error: 'Неверный email или пароль' }
  }
}
