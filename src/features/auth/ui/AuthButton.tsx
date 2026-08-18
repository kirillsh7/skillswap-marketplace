interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean
  LoadingText?: string
}

export const AuthButton = ({
  isSubmitting,
  LoadingText = 'Подождите...',
  children,
  ...props
}: AuthButtonProps) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className='w-full mt-2 bg-gradient-to-br from-primary to-primary-container text-on-primary py-3.5 rounded-full font-label font-semibold text-sm hover:opacity-90 active:scale-98 transition-all shadow-md shadow-primary/30'
      {...props}
    >
      {isSubmitting ? LoadingText : children}
    </button>
  )
}
