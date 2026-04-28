import { forwardRef, InputHTMLAttributes } from 'react'
import { AuthInput } from './AuthInput'
import { AuthLabel } from './AuthLabel'

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}
export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5'>
        <AuthLabel htmlFor={id}>label</AuthLabel>
        {children} {/* ← сюда передаётся <ForgotPasswordLink /> */}
        <AuthInput
          ref={ref}
          id={id}
          {...props}
        />
        {error && <p className='text-xs text-error px-1'>{error}</p>}
      </div>
    )
  },
)
