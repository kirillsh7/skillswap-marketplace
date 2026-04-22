import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет CSS классы с учётом конфликтов Tailwind.
 * Поддерживает условные классы, массивы, объекты.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
