import { Shield } from 'lucide-react'
import Link from 'next/link'

export const TrustSignal = () => {
  return (
    <div className='mt-auto pt-6 flex flex-col items-center gap-4'>
      <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-container/30 rounded-full'>
        <Shield className='h-4 w-4 text-secondary' />
        <span className='text-[0.65rem] font-medium text-on-secondary-container uppercase tracking-wider'>
          Secured by Guardian
        </span>
      </div>
      <p className='text-xs text-on-surface-variant'>
        Станьте частью Импульс Рынка,{' '}
        <Link
          href='/register'
          className='text-primary font-medium hover:underline underline-offset-4'
        >
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}
