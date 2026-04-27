import { RightColumn, LeftColumn } from '../_components'
import { RegisterForm } from './RegisterForm'

export const RegisterPage = () => {
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
