'use client'
import { Star, Zap } from 'lucide-react'

export const LargeFeaturedCard = () => {
  return (
    <div className='md:col-span-8 bg-surface-container-low rounded-xl overflow-hidden relative group'>
      <img
        alt='Business strategy session'
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
        src='https://lh3.googleusercontent.com/aida-public/AB6AXuDYKPR_2Ub0A0OxgMI6HdMWLnvvLIKPQBUvn_I281zV08Ia0w5erMDs5q7Flwc9jVzF63ZILOhdWvKH-iAIk4A3gvodCd9H7ZT4ZgKqoNnZGA--9DxLPkLaxOJ-Lyx_Ff9ov5mLxsk5Pi6Uu-EkD9DrodXdWLPVZ-zZHli2v6DSFcwtaXxtME8KYoSchXwx0f_AkZqNykJiNV-SiSgkoXArVh1o4DfENXYHSQ9ZIjNgKCIOXlyCN7Riiu9hQ4c00LzP62UxIZxOPipZ'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/40 to-transparent'></div>
      <div className='absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end'>
        <div className='flex items-center gap-3 mb-4'>
          <span className='px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full flex items-center gap-1 w-max'>
            <span className='material-symbols-outlined '>
              <Zap size={12} />
            </span>{' '}
            Быстрая оплата
          </span>
          <span className='px-3 py-1 glass-panel text-white text-xs font-semibold rounded-full w-max'>
            Топ-рейтинг
          </span>
        </div>
        <h3 className='text-3xl font-bold text-white mb-2'>Сара Дженкинс</h3>
        <p className='text-surface-dim mb-4 text-lg'>старший бренд-стратег</p>
        <div className='flex items-center gap-4 text-white/80 text-sm'>
          <div className='flex items-center gap-1'>
            <span
              className='material-symbols-outlined text-sm text-[#facc15]'
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <Star size={14} />
            </span>{' '}
            5.0 (124 отзыва)
          </div>
          <div className='w-1 h-1 rounded-full bg-white/50'></div>
          <div>От 150 долларов в час</div>
        </div>
      </div>
    </div>
  )
}
