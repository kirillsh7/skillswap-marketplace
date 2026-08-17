'use client'
import { ASSETS } from '@/shared/config'
import { IconButton, GhostButton, PrimaryButton } from '../../Buttons'
import { Bell, Wallet } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserDropdown } from './UserDropdown'
import { ROUTES } from '@/shared/constants'

export const UserAction = () => {
  const router = useRouter()

  const containerRef = useRef<HTMLDivElement>(null)
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    setIsOpen(false)
    signOut({ callbackUrl: ROUTES.HOME })
  }

  const handleProfileClick = () => {
    setIsOpen(false)
    router.push(ROUTES.PROFILE)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  const isAuthenticated = !!session

  if (status === 'loading') return <p>Загрузка...</p>

  return (
    <div
      className='flex items-center gap-4'
      ref={containerRef}
    >
      {isAuthenticated ? (
        <>
          <div className='hidden md:flex gap-4'>
            <IconButton icon={<Bell />} />
            <IconButton icon={<Wallet />} />
          </div>

          <GhostButton>
            <Link href={ROUTES.WALLET}>Мой кошелёк</Link>
          </GhostButton>
          <PrimaryButton>
            <Link href={`${ROUTES.ORDERS}/create`}>Разместить услугу</Link>
          </PrimaryButton>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center'
          >
            <Image
              alt='User avatar'
              className='w-8 h-8 rounded-full ml-2 border '
              src={ASSETS.avatar.defaultUser}
              width={32}
              height={32}
            />
          </button>
          {isOpen && (
            <UserDropdown
              onLogout={handleLogout}
              onProfileClick={handleProfileClick}
            />
          )}
        </>
      ) : (
        <PrimaryButton>
          <Link href={ROUTES.LOGIN}>Войти</Link>
        </PrimaryButton>
      )}
    </div>
  )
}
