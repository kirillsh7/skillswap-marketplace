'use client'
import Link from 'next/link'
import { MAIN_NAVIGATION_LINKS as ROUTES } from '@/shared'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib'

export const MainNav = () => {
  const pathname = usePathname()
  return (
    <div className='hidden md:flex gap-6'>
      {ROUTES.map(link => (
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
