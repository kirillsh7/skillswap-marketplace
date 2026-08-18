import { ROUTES } from '@/shared'

export const NAVIGATION_LINKS = [
  { name: 'Как это работает', href: ROUTES.HOME },
  { name: 'Услуги', href: ROUTES.SERVICES },
  { name: 'SkillSwap (Бартер)', href: ROUTES.BARTER },
  { name: 'Безопасность', href: ROUTES.ESCROW },
] as const
