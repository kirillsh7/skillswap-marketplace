import { Logo } from './Logo'
import { MainNav } from './MainNav'
import { UserAction } from './UserAction'

export const Header = () => {
  return (
    <header>
      <nav className='bg-white dark:bg-slate-900 shadow-sm fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 border-b border-slate-200 dark:border-slate-800 font-sans text-sm font-medium'>
        <div className='flex items-center gap-8'>
          <Logo />
          <MainNav />
        </div>
        <UserAction />
      </nav>
    </header>
  )
}
