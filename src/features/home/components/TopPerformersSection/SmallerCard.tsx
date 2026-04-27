'use client'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface SpecialistCardProps {
  name: string
  description: string
  category: string
  avatarUrl: string
  avatarAlt?: string
  rating: number
  reviewCount: number
  hourlyRate: number | string
}

export const SmallerCard = ({
  avatarAlt,
  avatarUrl,
  category,
  name,
  description,
  rating,
  reviewCount,
  hourlyRate,
}: SpecialistCardProps) => {
  return (
    <div className='md:col-span-4 bg-surface-container-lowest rounded-xl p-6 flex flex-col hover:bg-surface-container-low transition-colors shadow-sm'>
      <div className='flex justify-between items-start mb-6'>
        <Image
          alt={avatarAlt || name}
          className='w-16 h-16 rounded-full object-cover'
          src={avatarUrl}
          width={64}
          height={64}
        />
        <span className='px-2 py-1 bg-surface-container text-primary text-xs font-bold rounded-full'>
          {category}
        </span>
      </div>
      <h3 className='text-xl font-bold text-on-surface mb-1'>{name}</h3>
      <p className='text-on-surface-variant text-sm mb-4 flex-grow'>{description}</p>
      <div className='mt-auto space-y-4'>
        <div className='flex items-center gap-2 text-sm text-on-surface-variant'>
          <span
            className='material-symbols-outlined text-sm text-[#facc15]'
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            <Star size={14} />
          </span>{' '}
          {rating} ({reviewCount})
        </div>
        <div className='flex justify-between items-center pt-4 border-t border-surface-container-highest'>
          <span className='font-bold text-on-surface'> ${hourlyRate}/hr </span>
          <button className='text-primary font-semibold hover:text-primary-container transition-colors text-sm'>
            Забронировать
          </button>
        </div>
      </div>
    </div>
  )
}
