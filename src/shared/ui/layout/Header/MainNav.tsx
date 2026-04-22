'use client'
import Link from 'next/link'
import { navigationLinks } from './Header.constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'

export const MainNav = () => {
  const pathname = usePathname()
  return (
    <div className='hidden md:flex gap-6'>
      {navigationLinks.map(link => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            'text-slate-600 hover:text-indigo-600 transition-colors',
            pathname === link.href && 'text-indigo-600',
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
