import { z } from 'zod'

const PackageSchema = z.object({
  name: z.string().min(2, 'Название пакета минимум 2 символа'),
  price: z.number().min(1, 'Цена должна быть больше 0'),
  delivery: z.string().min(1, 'Укажите срок выполнения'),
  revisions: z.string().optional(),
  features: z.string().optional(),
  description: z.string().optional(),
})

// Основная схема заказа
export const OrdersSchema = z.object({
  // Шаг 1: Основное
  title: z.string().min(5, 'Минимум 5 символов').max(100, 'Слишком длинное название'),
  categories: z.enum(['design', 'dev', 'marketing', 'consulting']),
  subcategories: z.array(z.string()).optional(), // если храните JSON-строкой, позже преобразуем

  // Шаг 2: Детали
  description: z.string().min(20, 'Опишите подробнее (минимум 20 символов)').optional(),
  tags: z.array(z.string()).optional(), // аналогично, в SQLite будет строка
  images: z.array(z.string().url()).optional(), // массив URL

  // Шаг 3: Пакеты
  packages: z.array(PackageSchema).min(1, 'Добавьте хотя бы один пакет'),

  // Шаг 4: Публикация
  published: z.boolean(),
})

export type OrdersFormData = z.infer<typeof OrdersSchema>
