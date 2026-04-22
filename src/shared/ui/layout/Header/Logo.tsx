import Link from 'next/link'
import { LOGO_TEXT } from './Header.constants'

export const Logo = () => {
  return (
    <Link
      href='/'
      className='flex items-center gap-2'
    >
      <span className='text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight'>
        {LOGO_TEXT}
      </span>
    </Link>
  )
}
