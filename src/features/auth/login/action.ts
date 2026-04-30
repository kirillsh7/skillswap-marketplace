'use server'
import { signIn } from 'next-auth/react'
import { LoginSchema, type LoginFormData } from './schemas'
import { redirect } from 'next/navigation'
export async function loginAction(data: LoginFormData) {
  const validated = LoginSchema.safeParse(data)

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const result = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false,
  })

  if (result?.error) {
    // Здесь можно вернуть текст ошибки (например, "CredentialsSignin")
    return { error: 'Неверный email или пароль' }
  }
  redirect('/')
}
