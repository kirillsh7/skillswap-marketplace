import { ROUTES } from '@/shared'

export const NAVIGATION_LINKS = [
  { name: 'Как это работает', href: ROUTES.HOME },
  { name: 'SkillSwap (Бартер)', href: ROUTES.BARTER },
  { name: 'Безопасность', href: ROUTES.ESCROW },
  { name: 'Тарифы', href: ROUTES.ORDERS },
] as const
