import Link from 'next/link'
import { ROUTES } from '@/shared'
import { Eye, MessageCircle } from 'lucide-react'

interface ServiceListItemProps {
  id: string
  title: string
  description: string | null
  categories: string
  subcategories: string
  price: string
  authorName: string | null
  published: boolean
  createdAt: string
}

export const ServicesListItem = ({
  id,
  title,
  description,
  categories,
  subcategories,
  price,
  authorName,
  published,
  createdAt,
}: ServiceListItemProps) => {
  return (
    <div className='border-b border-surface-container py-5 flex flex-col md:flex-row md:items-start gap-4'>
      {/* Левая часть */}
      <div className='flex-1'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
          <Link
            href={`${ROUTES.SERVICES}/${id}`}
            className='text-lg font-semibold text-on-surface hover:text-primary transition-colors'
          >
            {title}
          </Link>
          <span className='text-on-surface font-medium whitespace-nowrap'>{price}</span>
        </div>
        <p className='text-sm text-on-surface-variant mt-1 line-clamp-3'>
          {description || 'Без описания'}
        </p>
        <div className='flex flex-wrap items-center justify-between mt-3 gap-2'>
          <div className='flex items-center gap-4 text-xs text-on-surface-variant'>
            <span className='font-semibold uppercase'>{categories}</span>
            <span>{createdAt}</span>
          </div>
          <div className='flex items-center gap-4 text-xs text-on-surface-variant'>
            <span className='inline-flex items-center gap-1'>
              <Eye size={14} /> 0
            </span>
            <span className='inline-flex items-center gap-1'>
              <MessageCircle size={14} /> Нет ответов
            </span>
          </div>
        </div>
      </div>

      {/* Кнопка справа */}
      <div className='md:self-center'>
        <Link
          href={`${ROUTES.SERVICES}/${id}`}
          className='inline-block px-5 py-2 bg-secondary text-on-secondary rounded-full text-sm font-medium hover:opacity-90 transition-opacity'
        >
          Откликнуться
        </Link>
      </div>
    </div>
  )
}
