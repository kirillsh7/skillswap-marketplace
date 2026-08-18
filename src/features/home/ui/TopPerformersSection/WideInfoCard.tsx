'use client'
import { CircleCheck } from 'lucide-react'

export const WideInfoCard = () => {
  return (
    <div className='md:col-span-8 bg-surface-container-low rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm'>
      <div className='flex-1 space-y-4'>
        <span className='px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-max inline-block mb-2'>
          Новая функция
        </span>
        <h3 className='text-2xl font-bold text-on-surface'>Гибкая комиссия</h3>
        <p className='text-on-surface-variant text-lg'>
          Вы сами контролируете свои тарифы. Измените их с 2% до 12% и сразу же оцените преимущества
          платформы.
        </p>
      </div>
      <div className='w-full md:w-1/2 bg-surface-container-lowest p-6 rounded-lg shadow-[0_10px_20px_-10px_rgba(7,30,39,0.05)]'>
        <div className='flex justify-between mb-2'>
          <span className='text-sm font-semibold text-on-surface'>Размер комиссии</span>
          <span className='text-sm font-bold text-primary'>5%</span>
        </div>
        <input
          className='w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary mb-4'
          max='12'
          min='2'
          type='range'
          defaultValue='5'
        />
        <div className='space-y-2 mt-4'>
          <div className='flex items-center gap-2 text-sm text-on-surface-variant'>
            <span
              className='material-symbols-outlined text-secondary text-sm'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <CircleCheck size={14} />
            </span>
            Приоритетное Размещение при поиске
          </div>
          <div className='flex items-center gap-2 text-sm text-on-surface-variant'>
            <span
              className='material-symbols-outlined text-secondary text-sm'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <CircleCheck size={14} />
            </span>
            Круглосуточная специализированная поддержка
          </div>
        </div>
      </div>
    </div>
  )
}
