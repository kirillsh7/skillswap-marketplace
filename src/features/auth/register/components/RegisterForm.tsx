'use client'
import Link from 'next/link'
import { RoleSelector } from './RoleSelector'
import { useForm } from 'react-hook-form'
import { useTRPC } from '@/lib/trpc/client'
import { useMutation } from '@tanstack/react-query'
import { AuthButton, AuthField } from '../../components'
import { RegisterFormData, RegisterSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
  const router = useRouter()
  const trpc = useTRPC()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rootError, setRootError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  })
  const registerMutation = useMutation(trpc.auth.register.mutationOptions())

  async function onSubmit(data: RegisterFormData) {
    setRootError(null)
    setIsSubmitting(true)
    try {
      await registerMutation.mutateAsync(data)
      router.push('/login?registered=true')
    } catch (error) {
      const message = error?.message || 'Произошла ошибка при регистрации'
      setRootError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className='space-y-6 bg-surface-container-lowest p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(7,30,39,0.06)]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <RoleSelector />

      <div className='space-y-4'>
        <AuthField
          label='Почта'
          id='email'
          type='email'
          placeholder='ivan@example.com'
          {...register('email')}
          error={errors.email?.message}
        />
        <AuthField
          label='Пароль'
          id='password'
          type='password'
          placeholder='••••••••'
          {...register('password')}
          error={errors.password?.message}
        />
        <AuthField
          label='Подтвердите пароль'
          id='confirmPassword'
          type='password'
          placeholder='••••••••'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      {rootError && (
        <p className='text-sm text-error text-center bg-error-container/30 rounded-lg py-2'>
          {rootError}
        </p>
      )}
      <div className='pt-4'>
        <AuthButton isSubmitting={isSubmitting}> Зарегистрироваться</AuthButton>
        <p className='text-center text-sm text-on-surface-variant mt-4 font-body'>
          Уже есть аккаунт?{' '}
          <Link
            className='text-primary font-semibold hover:underline'
            href='/login'
          >
            Войти
          </Link>
        </p>
      </div>
    </form>
  )
}
