import { cn } from '@/lib'
import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
        ghost: 'text-slate-600 hover:text-indigo-600 active:opacity-80',
        action: 'w-full md:w-auto btn-primary text-on-primary hover:opacity-90',
      },
      size: {
        default: 'px-4 py-2 rounded-lg',
        icon: 'p-2 rounded-lg',
        action: 'px-8 py-4 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  icon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className='shrink-0'>{icon}</span>}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export const PrimaryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button {...props} />
)
export const GhostButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button
    variant='ghost'
    {...props}
  />
)
export const ActionButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button
    variant='action'
    size='action'
    {...props}
  />
)
export const IconButton = ({
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode }) => (
  <Button
    variant='ghost'
    size='icon'
    icon={icon}
    {...props}
  />
)
