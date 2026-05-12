import { z } from 'zod'

const PackageSchema = z.object({
  name: z.string().min(2, 'Название пакета минимум 2 символа').optional(),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  delivery: z.string().min(1, 'Укажите срок выполнения'),
  revisions: z.string().optional(),
  features: z.array(z.string()).default([]),
  description: z.string().optional(),
})
const FaqSchema = z.object({
  question: z.string().min(1, 'Введите вопрос'),
  answer: z.string().min(1, 'Введите ответ'),
})
// Основная схема заказа
export const OrdersSchema = z.object({
  // Шаг 1: Основное
  title: z.string().min(5, 'Минимум 5 символов').max(100, 'Слишком длинное название'),
  categories: z.string(),
  subcategories: z.string(),

  // Шаг 2: Детали
  description: z.string().min(20, 'Опишите подробнее (минимум 20 символов)'),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),

  // Шаг 3: Пакеты
  packages: z.array(PackageSchema).default([]),

  // Шаг 4: FAQ
  faq: z.array(FaqSchema).default([]),
  // Шаг 5: Публикация
  published: z.boolean().optional(),
})

export type OrdersFormData = z.input<typeof OrdersSchema>
