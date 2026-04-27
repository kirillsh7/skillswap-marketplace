'use client'

import { AuthSocialButton } from '../../_components'
import { Briefcase, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useCallback } from 'react'

export const SocialLogin = () => {
  const handleGoogleSignIn = useCallback(() => signIn('google'), [])
  const handleGithubSignIn = useCallback(() => signIn('github'), [])
  return (
    <div className='flex flex-col gap-3'>
      <AuthSocialButton
        Icon={<LogIn className='h-5 w-5' />}
        onClick={handleGoogleSignIn}
        title='Войти через Google'
      />

      <AuthSocialButton
        Icon={<Briefcase className='h-5 w-5' />}
        onClick={handleGithubSignIn}
        title='Войти через GitHub'
      />
    </div>
  )
}
