import { cn } from '@/lib'
import { ButtonHTMLAttributes } from 'react'

export const PrimaryButton = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors active:opacity-80',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
