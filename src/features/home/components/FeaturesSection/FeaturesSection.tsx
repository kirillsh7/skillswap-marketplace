'use client'
import { CircleCheck, Hammer, Landmark, Lock, TrendingUp, Zap } from 'lucide-react'
import { StepCard } from './StepCard'

const stepsData = [
  {
    stepNumber: 1,
    title: 'Депозит',
    description:
      'Средства надежно хранятся на нашем нейтральном счете условного депонирования до начала работы.',
    icon: <Landmark />,
    badgeText: '100% Защищенный',
    badgeIcon: <Lock size={16} />,
    variant: 'primary' as const,
  },
  {
    stepNumber: 2,
    title: 'Услуга',
    description: 'Профессионал предоставит согласованное обслуживание к вашему удовлетворению.',
    icon: <Hammer />,
    badgeText: 'Отслеживание этапов',
    badgeIcon: <TrendingUp size={16} />,
    variant: 'primary' as const,
  },
  {
    stepNumber: 3,
    title: 'Автоматическая выплата',
    description:
      'Как только вы одобрите работу, денежные средства автоматически будут переведены продавцу.',
    icon: <CircleCheck />,
    badgeText: 'Высвобождение без трения',
    badgeIcon: <Zap size={16} />,
    variant: 'secondary' as const,
  },
]

export const FeaturesSection = () => {
  return (
    <section className='py-24 px-6 lg:px-12 bg-surface-container-low'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16 space-y-4'>
          <h2 className='text-4xl font-headline font-bold text-on-surface tracking-tight'>
            Безопасная сделка в 3 этапа
          </h2>
          <p className='text-lg text-on-surface-variant'>
            Гарантированное спокойствие при каждой сделке.
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {stepsData.map(step => (
            <StepCard
              key={step.stepNumber}
              {...step}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
