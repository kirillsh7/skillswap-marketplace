import { LoginForm, SocialLogin } from '@/features'
import { Metadata } from 'next'
import { ROUTES, SITE_NAME } from '@/shared'
import { Shield } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `${SITE_NAME} - Авторизация `,
}

export default function LoginPage() {
  return (
    <div className='class="bg-surface text-on-surface min-h-screen flex items-center justify-center p-4 antialiased'>
      <div className='w-full max-w-md bg-surface-container-lowest rounded-lg shadow-[0_20px_40px_-15px_rgba(7,30,39,0.06)] relative overflow-hidden flex flex-col pt-12 pb-10 px-8 sm:px-12'>
        <div className='text-center mb-10'>
          <h1 className='font-headline text-[2.75rem] font-bold tracking-tight text-on-surface mb-2 leading-none'>
            Авторизация
          </h1>
        </div>

        {/*  Social Login */}
        <SocialLogin />

        {/*  Or Divider */}
        <div className='flex items-center gap-4 mb-8'>
          <div className='h-[1px] flex-1 bg-surface-container-low'></div>
          <span className='font-label text-xs text-on-surface-variant uppercase tracking-widest'>
            или
          </span>
          <div className='h-[1px] flex-1 bg-surface-container-low'></div>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Trust Signal */}
        <div className='mt-auto pt-6 flex flex-col items-center gap-4'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-container/30 rounded-full'>
            <Shield className='h-4 w-4 text-secondary' />
            <span className='text-[0.65rem] font-medium text-on-secondary-container uppercase tracking-wider'>
              Secured by Guardian
            </span>
          </div>
          <p className='text-xs text-on-surface-variant'>
            Станьте частью Импульс Рынка,{' '}
            <Link
              href={ROUTES.REGISTER}
              className='text-primary font-medium hover:underline underline-offset-4'
            >
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
