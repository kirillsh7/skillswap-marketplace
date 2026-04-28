'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordLink } from '../_components/ForgotPasswordLink'
import { LoginSchema, type LoginFormData } from '../schemas'
import { AuthButton, AuthField } from '../../_components'
import { loginAction } from '../action'
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
      <AuthField
        id='email'
        type='email'
        label='Почта'
        error={errors.email?.message}
        {...register('email')}
      />

      <AuthField
        id='password'
        type='password'
        label='Пароль'
        error={errors.password?.message}
        {...register('password')}
      >
        {' '}
        <ForgotPasswordLink />
      </AuthField>

      {rootError && (
        <p className='text-sm text-error text-center bg-error-container/30 rounded-lg py-2'>
          {rootError}
        </p>
      )}

      <AuthButton isSubmitting={isSubmitting}>Войти</AuthButton>
    </form>
  )
}
