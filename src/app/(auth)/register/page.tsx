import { Metadata } from 'next'
import { RegisterRightColumn, SITE_NAME } from '@/shared'
import { RegisterForm } from '@/features'
import { BadgeCheck, KeyRound, Scale, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: `${SITE_NAME} Регистрация `,
}
export default function Register() {
  return (
    <div className='bg-surface text-on-surface antialiased min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
        {/* Left Column */}
        <div className='flex flex-col gap-8 order-2 lg:order-1'>
          <div>
            <h1 className='text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight mb-4'>
              Присоединяйтесь к Импульс Рынка
            </h1>
            <p className='text-lg text-on-surface-variant font-body'>
              Создайте аккаунт и начните безопасный обмен услугами. Ваши сделки защищены гарантией
              Safe Deal.
            </p>
          </div>

          {/* Register Form */}
          <RegisterForm />
        </div>

        {/* Right Column */}
        <div className='order-1 lg:order-2 flex flex-col gap-6'>
          <div className='bg-surface-container-low rounded-xl p-8 relative overflow-hidden'>
            <div className='absolute -right-12 -top-12 w-48 h-48 bg-secondary-container rounded-full opacity-20 blur-2xl' />
            <h2 className='text-2xl font-headline font-bold text-on-surface mb-4 flex items-center gap-2'>
              <span
                className='material-symbols-outlined text-secondary'
                data-icon='shield'
              >
                <Shield />
              </span>
              Гарантия безопасной сделки
            </h2>
            <p className='text-on-surface-variant mb-6 font-body leading-relaxed'>
              Ваше спокойствие — наш приоритет. Средства хранятся на защищённом escrow-счёте до тех
              пор, пока вы не подтвердите выполнение всех условий.
            </p>
            <ul className='space-y-4'>
              <li className='flex gap-3 items-start'>
                <div className='bg-secondary-container text-on-secondary-container p-2 rounded-full flex-shrink-0 mt-1'>
                  <KeyRound className='material-symbols-outlined text-sm' />
                </div>
                <div>
                  <strong className='block text-on-surface font-label font-semibold'>
                    Безопасный escrow
                  </strong>
                  <span className='text-sm text-on-surface-variant font-body'>
                    Средства замораживаются на нейтральном счёте до одобрения работы.
                  </span>
                </div>
              </li>
              <li className='flex gap-3 items-start'>
                <div className='bg-secondary-container text-on-secondary-container p-2 rounded-full flex-shrink-0 mt-1'>
                  <BadgeCheck className='material-symbols-outlined text-sm' />
                </div>
                <div>
                  <strong className='block text-on-surface font-label font-semibold'>
                    Проверенные исполнители
                  </strong>
                  <span className='text-sm text-on-surface-variant font-body'>
                    Каждый специалист проходит строгую проверку личности и портфолио.
                  </span>
                </div>
              </li>
              <li className='flex gap-3 items-start'>
                <div className='bg-secondary-container text-on-secondary-container p-2 rounded-full flex-shrink-0 mt-1'>
                  <Scale className='material-symbols-outlined text-sm' />
                </div>
                <div>
                  <strong className='block text-on-surface font-label font-semibold'>
                    Справедливое разрешение споров
                  </strong>
                  <span className='text-sm text-on-surface-variant font-body'>
                    Беспристрастная медиация в редких случаях разногласий.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className='h-64 rounded-xl overflow-hidden shadow-sm relative'>
            <img
              alt='Современный минималистичный офис со стеклянными перегородками, тёплым освещением и профессиональной атмосферой'
              className='w-full h-full object-cover'
              src={RegisterRightColumn}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent flex items-end p-6'>
              <p className='text-surface font-body text-sm font-medium'>
                Повышаем стандарты профессионального обмена.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
