import { cn } from '@/lib'
import { LabelHTMLAttributes } from 'react'

export const AuthLabel = ({
  children,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={cn('text-xs font-medium text-on-surface-variant px-1', className)}
      {...props}
    >
      {children}
    </label>
  )
}
