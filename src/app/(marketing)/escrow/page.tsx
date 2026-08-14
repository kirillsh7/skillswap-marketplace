import { Shield, Lock, CheckCircle, Scale } from 'lucide-react'

const steps = [
  {
    icon: Lock,
    title: 'Депозит',
    description: 'Средства замораживаются на нейтральном счёте до выполнения работы.',
  },
  {
    icon: Shield,
    title: 'Выполнение',
    description: 'Исполнитель выполняет заказ, заказчик может контролировать процесс.',
  },
  {
    icon: CheckCircle,
    title: 'Выплата',
    description: 'После одобрения деньги автоматически переводятся исполнителю.',
  },
  {
    icon: Scale,
    title: 'Споры',
    description: 'В случае разногласий — беспристрастное разрешение.',
  },
]

export default function EscrowPage() {
  return (
    <div className='container mx-auto py-16 mt-24'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Безопасная сделка</h1>
        <p className='text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Ваше спокойствие — наш приоритет. Средства хранятся на защищённом escrow-счёте до тех пор,
          пока вы не подтвердите выполнение всех условий.
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {steps.map((step, index) => (
          <div
            key={index}
            className='bg-surface-container-lowest rounded-2xl p-6 text-center shadow'
          >
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-secondary-container/30 flex items-center justify-center'>
              <step.icon className='w-8 h-8 text-secondary' />
            </div>
            <h2 className='text-lg font-semibold mb-2'>{step.title}</h2>
            <p className='text-sm text-on-surface-variant'>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
