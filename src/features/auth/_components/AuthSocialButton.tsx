interface AuthSocialButtonProps {
  Icon: React.ReactNode
  title: string
  onClick: () => void
}

export const AuthSocialButton = ({ Icon, title, onClick }: AuthSocialButtonProps) => {
  return (
    <button
      className='w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-high text-on-primary-fixed-variant rounded-full font-label font-medium hover:bg-surface-container transition-colors duration-200'
      onClick={onClick}
    >
      {Icon}
      {title}
    </button>
  )
}
