'use client'

import { CATEGORIES_OPTIONS } from '@/features/services/config/categories'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export const ServicesFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [subcategory, setSubcategory] = useState(searchParams.get('subcategory') || '')
  const [query, setQuery] = useState(searchParams.get('query') || '')
  const [onlyPublished, setOnlyPublished] = useState(searchParams.get('published') === '1')

  const currentCategory = CATEGORIES_OPTIONS.find(c => c.value === category)
  const subcategories = currentCategory?.subcategories || []

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (subcategory) params.set('subcategory', subcategory)
    if (query) params.set('query', query)
    if (onlyPublished) params.set('published', '1')

    router.push(`/services?${params.toString()}`)
  }

  const resetFilters = () => {
    setCategory('')
    setSubcategory('')
    setQuery('')
    setOnlyPublished(false)
    router.push('/services')
  }

  return (
    <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-5 space-y-6'>
      <h3 className='font-semibold text-on-surface'>Фильтры</h3>

      {/* Поиск */}
      <div className='space-y-2'>
        <label className='text-sm font-medium text-on-surface'>Поиск</label>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Что ищете?'
          className='w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30'
        />
      </div>

      {/* Категория */}
      <div className='space-y-2'>
        <label className='text-sm font-medium text-on-surface'>Категория</label>
        <select
          value={category}
          onChange={e => {
            setCategory(e.target.value)
            setSubcategory('') // сбросить подкатегорию
          }}
          className='w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer'
        >
          <option value=''>Все категории</option>
          {CATEGORIES_OPTIONS.map(cat => (
            <option
              key={cat.value}
              value={cat.value}
            >
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Подкатегория */}
      <div className='space-y-2'>
        <label className='text-sm font-medium text-on-surface'>Подкатегория</label>
        <select
          value={subcategory}
          onChange={e => setSubcategory(e.target.value)}
          disabled={!category}
          className='w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <option value=''>Все подкатегории</option>
          {subcategories.map(sub => (
            <option
              key={sub}
              value={sub}
            >
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Чекбокс */}
      <div className='space-y-2'>
        <label className='flex items-center gap-2 text-sm text-on-surface cursor-pointer'>
          <input
            type='checkbox'
            checked={onlyPublished}
            onChange={e => setOnlyPublished(e.target.checked)}
            className='rounded border-outline-variant'
          />
          Только опубликованные
        </label>
      </div>

      {/* Кнопки */}
      <div className='flex gap-3'>
        <button
          onClick={applyFilters}
          className='flex-1 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity'
        >
          Применить
        </button>
        <button
          onClick={resetFilters}
          className='px-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors'
        >
          Сброс
        </button>
      </div>
    </div>
  )
}
