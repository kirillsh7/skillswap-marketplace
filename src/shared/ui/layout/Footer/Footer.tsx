import Link from 'next/link'
import { FOOTER_TEXT, footerLinks } from './Footer.constants'

export const Footer = () => {
  return (
    <footer className='bg-white dark:bg-slate-900 w-full py-8 px-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-200 dark:border-slate-800'>
      <div className='font-bold text-slate-800 dark:text-slate-200'>{FOOTER_TEXT}</div>
      <div className='flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-slate-500 dark:text-slate-400'>
        {footerLinks.map(link => (
          <Link
            key={link.name}
            href={link.href}
            className='text-slate-500 hover:text-indigo-500 hover:underline transition-all'
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  )
}
