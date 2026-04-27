'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormData } from '../schemas'
import { useState } from 'react'
import { loginAction } from '../action'
import { AuthInput, AuthLabel, AuthButton } from '../../_components'
import Link from 'next/link'
export const LoginForm = () => {
  const [rootError, setRootError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
  })
  async function onSubmit(data: LoginFormData) {
    setRootError(null)
    const result = await loginAction(data)

    if (result?.error) {
      if (typeof result.error === 'string') {
        setRootError(result.error)
      }
    }
  }

  return (
    <form
      className='flex flex-col gap-5 mb-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col gap-1.5'>
        <AuthLabel htmlFor='email'>Почта</AuthLabel>
        <AuthInput
          id='email'
          type='email'
          placeholder='name@domain.com'
          {...register('email')}
        />
        {errors.email && <p className='text-xs text-error px-1'>{errors.email.message}</p>}
      </div>

      <div className='flex flex-col gap-1.5'>
        <div className='flex justify-between items-center px-1'>
          <AuthLabel htmlFor='password'>Пароль</AuthLabel>
          <Link
            href='/forgot-password'
            className='text-xs font-medium text-primary hover:text-primary-container transition-colors'
          >
            Забыли пароль?
          </Link>
        </div>
        <AuthInput
          id='password'
          type='password'
          placeholder='••••••••'
          {...register('password')}
        />
        {errors.password && <p className='text-xs text-error px-1'>{errors.password.message}</p>}
      </div>

      {rootError && (
        <p className='text-sm text-error text-center bg-error-container/30 rounded-lg py-2'>
          {rootError}
        </p>
      )}

      <AuthButton isSubmitting={isSubmitting}>Войти</AuthButton>
    </form>
  )
}
