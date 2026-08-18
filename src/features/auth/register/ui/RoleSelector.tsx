import { GraduationCap, User } from 'lucide-react'
interface RoleSelectorProps {
  value?: string
  onChange?: (value: string) => void
  error?: string
}
export const RoleSelector = ({ value, onChange, error }: RoleSelectorProps) => {
  return (
    <fieldset className='space-y-4'>
      <legend className='text-sm font-semibold text-on-surface-variant mb-2 font-label uppercase tracking-wider'>
        Выберите роль
      </legend>
      <div className='grid grid-cols-2 gap-4'>
        <label className='relative flex cursor-pointer rounded-lg bg-surface-container-low p-4 focus:outline-none ring-2 ring-transparent hover:bg-surface-container transition-colors'>
          <input
            className='peer sr-only'
            name='role'
            type='radio'
            value='CLIENT'
            checked={value === 'CLIENT'}
            onChange={e => onChange?.(e.target.value)}
          />
          <span className='flex flex-col'>
            <User className='material-symbols-outlined text-primary mb-2' />
            <span className='text-sm font-semibold text-on-surface font-label'>Заказчик</span>
            <span className='text-xs text-on-surface-variant mt-1 font-body'>
              Я хочу нанять специалиста.
            </span>
          </span>
          <span className='absolute inset-0 rounded-lg ring-2 ring-inset ring-transparent peer-checked:ring-primary pointer-events-none transition-all' />
        </label>
        <label className='relative flex cursor-pointer rounded-lg bg-surface-container-low p-4 focus:outline-none ring-2 ring-transparent hover:bg-surface-container transition-colors'>
          <input
            className='peer sr-only'
            name='role'
            type='radio'
            value='PROVIDER'
            checked={value === 'PROVIDER'}
            onChange={e => onChange?.(e.target.value)}
          />
          <span className='flex flex-col'>
            <GraduationCap className='material-symbols-outlined text-primary mb-2' />
            <span className='text-sm font-semibold text-on-surface font-label'>Исполнитель</span>
            <span className='text-xs text-on-surface-variant mt-1 font-body'>
              Я хочу предлагать услуги.
            </span>
          </span>
          <span className='absolute inset-0 rounded-lg ring-2 ring-inset ring-transparent peer-checked:ring-primary pointer-events-none transition-all' />
        </label>
        <p className='text-xs text-error'>{error}</p>
      </div>
    </fieldset>
  )
}
