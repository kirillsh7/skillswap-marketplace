import { cn } from '@/lib'
import { ButtonHTMLAttributes } from 'react'

export const ActionButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'w-full md:w-auto btn-primary text-on-primary rounded-full px-8 py-4 font-semibold hover:opacity-90 transition-all active:scale-95 whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
