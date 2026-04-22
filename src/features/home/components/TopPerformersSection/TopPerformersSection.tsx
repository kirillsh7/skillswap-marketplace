import { MoveRight } from 'lucide-react'
import { LargeFeaturedCard } from './LargeFeaturedCard'
import { SmallerCard } from './SmallerCard'
import { WideInfoCard } from './WideInfoCard'
import { ASSETS } from '@/shared'

export const TopPerformersSection = () => {
  return (
    <section className='py-24 px-6 lg:px-12 bg-surface'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
          <div className='space-y-4'>
            <h2 className='text-4xl font-headline font-bold text-on-surface tracking-tight'>
              Лучшие исполнители
            </h2>
            <p className='text-lg text-on-surface-variant'>
              Проверенные эксперты, готовые улучшить ваши проекты.
            </p>
          </div>
          <button className='text-primary font-semibold hover:opacity-80 transition-opacity flex items-center gap-1'>
            Просмотреть все{' '}
            <span className='material-symbols-outlined text-sm'>
              <MoveRight />
            </span>
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,_auto)]'>
          <LargeFeaturedCard />

          <SmallerCard
            avatarUrl={ASSETS.avatar.marcusChen}
            avatarAlt='Designer portrait'
            category='Web Dev'
            name='Маркус Чен'
            description='Full-stack инженер, специализирующийся на React и Node.js.'
            rating={4.9}
            reviewCount={112}
            hourlyRate={85}
          />

          <SmallerCard
            avatarUrl={ASSETS.avatar.elenaRodriguez}
            avatarAlt='Designer portrait'
            category='UI/UX'
            name='Елена Родригес'
            description='Создание интуитивно понятного цифрового интерфейса для стартапов.'
            rating={4.8}
            reviewCount={112}
            hourlyRate={95}
          />

          <WideInfoCard />
        </div>
      </div>
    </section>
  )
}
