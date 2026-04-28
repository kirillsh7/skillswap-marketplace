import Link from 'next/link'

export const ForgotPasswordLink = () => (
  <Link
    href='/forgot-password'
    className='text-xs font-medium text-primary hover:text-primary-container transition-colors'
  >
    Забыли пароль?
  </Link>
)
