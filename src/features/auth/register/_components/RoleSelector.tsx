import { GraduationCap, User } from 'lucide-react'

export const RoleSelector = () => {
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
            value='client'
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
            value='provider'
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
      </div>
    </fieldset>
  )
}
