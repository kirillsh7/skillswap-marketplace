import { ASSETS } from '@/shared/config'
import { IconButton, GhostButton, PrimaryButton } from '../../Buttons'
import { Bell, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const UserAction = () => {
  const isAuthenticated = false
  return (
    <div className='flex items-center gap-4'>
      {isAuthenticated ? (
        <>
          <div className='hidden md:flex gap-4'>
            <IconButton icon={<Bell />} />
            <IconButton icon={<Wallet />} />
          </div>

          <GhostButton>Мой кошелёк</GhostButton>
          <PrimaryButton> Разместить услугу</PrimaryButton>
          <Image
            alt='User avatar'
            className='w-8 h-8 rounded-full ml-2'
            src={ASSETS.avatar.defaultUser}
            width={32}
            height={32}
          />
        </>
      ) : (
        <PrimaryButton>
          <Link href='/login'>Войти</Link>
        </PrimaryButton>
      )}
    </div>
  )
}
