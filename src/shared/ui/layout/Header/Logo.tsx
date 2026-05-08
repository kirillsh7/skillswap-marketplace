import Link from 'next/link'
import { SITE_NAME } from '@/shared'

export const Logo = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2'
    >
      <span className='text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight'>
        {SITE_NAME}
      </span>
    </Link>
  )
}
