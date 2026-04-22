import { type ReactNode } from 'react'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  icon: ReactNode
  badgeText: string
  badgeIcon: ReactNode
  variant?: 'primary' | 'secondary'
}

export const StepCard = ({
  stepNumber,
  title,
  description,
  icon,
  badgeText,
  badgeIcon,
  variant = 'primary',
}: StepCardProps) => {
  const backgroundColor = variant === 'secondary'
  return (
    <div className='bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group'>
      <div className='absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500'></div>
      <div
        className={`w-12 h-12  
          ${
            backgroundColor
              ? 'text-secondary bg-secondary-container'
              : 'bg-surface-container text-primary'
          }
           rounded-lg flex items-center justify-center mb-6 relative z-10`}
      >
        <span
          className='material-symbols-outlined text-2xl'
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <h3 className='text-xl font-bold text-on-surface mb-3 relative z-10'>
        {stepNumber}. {title}
      </h3>
      <p className='text-on-surface-variant leading-relaxed relative z-10'>{description}</p>
      <div
        className={`mt-6 flex items-center gap-2 text-sm font-semibold 
          ${backgroundColor ? 'text-secondary' : 'text-primary'} 
          relative z-10`}
      >
        <span>{badgeText}</span>
        <span className='material-symbols-outlined text-sm'>{badgeIcon}</span>
      </div>
    </div>
  )
}
