'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTRPC } from '@/lib/trpc/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction, changePasswordAction } from '@/features/settings/actions'
import { User, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { ROUTES } from '@/shared'

export default function SettingsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const { data: user, isLoading: isUserLoading } = useQuery(
    trpc.auth.me.queryOptions(undefined, {
      enabled: status === 'authenticated',
    }),
  )

  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null)
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.LOGIN)
    }
  }, [status, router])

  if (status === 'loading' || isUserLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
      </div>
    )
  }

  if (!user) {
    return null // или редирект
  }

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setProfileMessage(null)
    setIsProfileSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateProfileAction(formData)
    if (result.success) {
      setProfileMessage('Профиль обновлён')
      queryClient.invalidateQueries(trpc.auth.me.queryOptions())
    } else {
      setProfileMessage(result.error || 'Ошибка')
    }
    setIsProfileSubmitting(false)
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordMessage(null)
    setIsPasswordSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const result = await changePasswordAction(formData)
    if (result.success) {
      setPasswordMessage('Пароль изменён')
    } else {
      setPasswordMessage(result.error || 'Ошибка')
    }
    setIsPasswordSubmitting(false)
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6'>Настройки</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Основные данные */}
        <form
          onSubmit={handleProfileSubmit}
          className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6 space-y-4'
        >
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <User className='w-5 h-5 text-primary' />
            Основные данные
          </h2>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>Имя</label>
            <input
              name='firstName'
              defaultValue={user.firstName || ''}
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>Фамилия</label>
            <input
              name='lastName'
              defaultValue={user.lastName || ''}
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>
              Email (нельзя изменить)
            </label>
            <input
              value={user.email}
              disabled
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface-variant cursor-not-allowed'
            />
          </div>

          {profileMessage && (
            <p
              className={`text-sm flex items-center gap-2 ${
                profileMessage.startsWith('Профиль') ? 'text-secondary' : 'text-destructive'
              }`}
            >
              {profileMessage.startsWith('Профиль') ? (
                <CheckCircle className='w-4 h-4' />
              ) : (
                <AlertCircle className='w-4 h-4' />
              )}
              {profileMessage}
            </p>
          )}

          <button
            type='submit'
            disabled={isProfileSubmitting}
            className='w-full py-3 rounded-full bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity disabled:opacity-50'
          >
            {isProfileSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>

        {/* Смена пароля */}
        <form
          onSubmit={handlePasswordSubmit}
          className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6 space-y-4'
        >
          <h2 className='text-xl font-semibold flex items-center gap-2'>
            <Lock className='w-5 h-5 text-primary' />
            Смена пароля
          </h2>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>Текущий пароль</label>
            <input
              type='password'
              name='currentPassword'
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>Новый пароль</label>
            <input
              type='password'
              name='newPassword'
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>
              Повторите новый пароль
            </label>
            <input
              type='password'
              name='confirmPassword'
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            />
          </div>

          {passwordMessage && (
            <p
              className={`text-sm flex items-center gap-2 ${
                passwordMessage.startsWith('Пароль') ? 'text-secondary' : 'text-destructive'
              }`}
            >
              {passwordMessage.startsWith('Пароль') ? (
                <CheckCircle className='w-4 h-4' />
              ) : (
                <AlertCircle className='w-4 h-4' />
              )}
              {passwordMessage}
            </p>
          )}

          <button
            type='submit'
            disabled={isPasswordSubmitting}
            className='w-full py-3 rounded-full bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity disabled:opacity-50'
          >
            {isPasswordSubmitting ? 'Сохранение...' : 'Сменить пароль'}
          </button>
        </form>
      </div>
    </div>
  )
}
