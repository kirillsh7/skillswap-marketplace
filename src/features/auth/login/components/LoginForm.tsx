'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordLink } from './ForgotPasswordLink'
import { LoginSchema, type LoginFormData } from '../schemas'
import { AuthButton, AuthField } from '../../components'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export const LoginForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  })
  async function onSubmit(data: LoginFormData) {
    setServerError(null)

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // не даём NextAuth делать редирект самому
    })

    if (result?.error) {
      setServerError('Неверный email или пароль')
    } else {
      router.push('/') // или на любую защищённую страницу
      router.refresh() // обновить данные сессии на клиенте
    }
  }

  return (
    <form
      className='flex flex-col gap-5 mb-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <AuthField
        id='email'
        type='email'
        label='Почта'
        placeholder='ivan@example.com'
        error={errors.email?.message}
        {...register('email')}
      />

      <AuthField
        id='password'
        type='password'
        label='Пароль'
        placeholder='••••••••'
        error={errors.password?.message}
        {...register('password')}
      >
        <ForgotPasswordLink />
      </AuthField>

      {serverError && (
        <p className='text-sm text-error text-center bg-error-container/30 rounded-lg py-2'>
          {serverError}
        </p>
      )}

      <AuthButton isSubmitting={isSubmitting}>Войти</AuthButton>
    </form>
  )
}
