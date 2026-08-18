import { CircleCheck, Hammer, Landmark, Lock, TrendingUp, Zap } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  icon: ReactNode
  badgeText: string
  badgeIcon: ReactNode
  variant: Variant
}

export const stepsData: StepCardProps[] = [
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
