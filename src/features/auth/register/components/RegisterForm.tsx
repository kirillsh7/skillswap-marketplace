'use client'
import Link from 'next/link'
import { RoleSelector } from '../_components'
import { useForm } from 'react-hook-form'
import { AuthButton, AuthField } from '../../_components'
import { RegisterFormData, RegisterSchema } from '../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerAction } from '../action'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
  })
  async function onSubmit(data: RegisterFormData) {
    const result = await registerAction(data)

    if (result?.error) {
      console.log(result.error)
    }
  }

  return (
    <form
      className='space-y-6 bg-surface-container-lowest p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(7,30,39,0.06)]'
      onSubmit={handleSubmit(onSubmit)}
    >
      <RoleSelector />

      <div className='space-y-4'>
        {/* <AuthField 
          label='Имя'
          id='fullName'
          type='text'
          placeholder='Иван'
          {...register('fullName')}
          error={errors.fullName?.message}
        /> */}
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
      </div>

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
