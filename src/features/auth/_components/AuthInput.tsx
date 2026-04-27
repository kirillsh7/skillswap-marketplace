import { cn } from '@/lib'
import { InputHTMLAttributes } from 'react'

export const AuthInput = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        'w-full bg-surface-container-highest border-none rounded-lg px-4 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-surface-tint/30 transition-all placeholder:text-outline/50',
        className,
      )}
      {...props}
    />
  )
}
