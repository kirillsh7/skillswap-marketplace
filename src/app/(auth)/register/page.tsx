import { Metadata } from 'next'
import { SITE_NAME } from '@/shared'
import { LeftColumn, RegisterForm, RightColumn } from '@/features'

export const metadata: Metadata = {
  title: `${SITE_NAME} Регистрация `,
}
export default function Register() {
  return (
    <div className='bg-surface text-on-surface antialiased min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
        <LeftColumn>
          <RegisterForm />
        </LeftColumn>
        <RightColumn />
      </div>
    </div>
  )
}
