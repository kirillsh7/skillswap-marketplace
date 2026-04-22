import { cn } from '@/lib'
import { ButtonHTMLAttributes } from 'react'

export const GhostButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'text-slate-600 hover:text-indigo-600 font-semibold active:opacity-80 transition-opacity',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
