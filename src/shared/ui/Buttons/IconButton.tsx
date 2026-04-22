import { cn } from '@/lib'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
}

export const IconButton = ({ icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'text-slate-600 hover:text-indigo-600 transition-colors flex items-center justify-center p-2 rounded-full hover:bg-slate-100',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  )
}
