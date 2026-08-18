'use client'
import { stepsData } from '../../config/StepsData.constant'
import { StepCard } from './StepCard'

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
