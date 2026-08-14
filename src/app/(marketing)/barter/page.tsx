import { ShieldCheck, Users } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Прямой обмен',
    description: 'Предложите свою услугу в обмен на другую без денежных переводов.',
  },
  {
    icon: ShieldCheck,
    title: 'Безопасность',
    description: 'Платформа гарантирует выполнение обязательств обеими сторонами.',
  },
  {
    icon: Users,
    title: 'Сообщество',
    description: 'Найдите специалистов из разных областей для взаимовыгодного сотрудничества.',
  },
]

export default function BarterPage() {
  return (
    <div className='container mx-auto py-16 mt-24'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>SkillSwap (Бартер)</h1>
        <p className='text-lg text-on-surface-variant max-w-2xl mx-auto'>
          Обменивайтесь услугами без денег. Ваши навыки — это валюта.
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        {features.map(feature => (
          <div
            key={feature.title}
            className='bg-surface-container-lowest rounded-2xl p-8 text-center shadow hover:shadow-lg transition-shadow'
          >
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center'>
              <feature.icon className='w-8 h-8 text-primary' />
            </div>
            <h2 className='text-xl font-semibold mb-2'>{feature.title}</h2>
            <p className='text-sm text-on-surface-variant'>{feature.description}</p>
          </div>
        ))}
      </div>
      <div className='text-center mt-12'>
        <p className='text-on-surface-variant'>
          Скоро здесь появится возможность создавать бартерные предложения.
        </p>
      </div>
    </div>
  )
}
