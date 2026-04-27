import { LoginForm } from './LoginForm'
import { TrustSignal } from './TrustSignal'
import { SocialLogin } from './SocialLogin'

export const LoginPage = () => {
  return (
    <div className='class="bg-surface text-on-surface min-h-screen flex items-center justify-center p-4 antialiased'>
      <div className='w-full max-w-md bg-surface-container-lowest rounded-lg shadow-[0_20px_40px_-15px_rgba(7,30,39,0.06)] relative overflow-hidden flex flex-col pt-12 pb-10 px-8 sm:px-12'>
        <div className='text-center mb-10'>
          <h1 className='font-headline text-[2.75rem] font-bold tracking-tight text-on-surface mb-2 leading-none'>
            Авторизация
          </h1>
        </div>
        <SocialLogin />
        <div className='flex items-center gap-3 my-6'>
          <div className='h-px flex-1 bg-gray-300' />
          <span className='text-xs text-gray-500'>или</span>
          <div className='h-px flex-1 bg-gray-300' />
        </div>

        <LoginForm />
        <TrustSignal />
      </div>
    </div>
  )
}
