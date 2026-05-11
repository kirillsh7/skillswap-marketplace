'use client'
import { useForm } from 'react-hook-form'
import { OrdersFormData, OrdersSchema } from './schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import { CATEGORIES_OPTIONS } from './constants/categories'
export const OrdersForm = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrdersFormData>({
    resolver: zodResolver(OrdersSchema),
  })

  const currentSubcategories =
    CATEGORIES_OPTIONS.find(c => c.value === watch('categories'))?.subcategories || []

  return (
    <div className='bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden'>
      {/* Step 1: Basic Info */}

      <form className='p-6 lg:p-8 space-y-6'>
        <div>
          <h2 className='text-xl font-semibold text-on-surface mb-2'>Основная информация</h2>
          <p className='text-sm text-on-surface-variant'>
            Опишите вашу услугу максимально подробно
          </p>
        </div>

        {/* Title */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-on-surface'>
            Название услуги
            {!watch('title') && <span className='text-destructive ml-1'>*</span>}
          </label>
          <input
            type='text'
            {...register('title')}
            placeholder='Например: Создание современного UI/UX дизайна для мобильного приложения'
            className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
            maxLength={100}
          />
          <div className='flex items-center justify-between text-xs text-on-surface-variant'>
            <span className='flex items-center gap-1'>
              <Info className='w-3.5 h-3.5' />
              Минимум 10 символов
            </span>
            <span>{watch('title')?.length ?? 0}/100</span>
          </div>
        </div>

        {/* Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>
              Категория
              {!watch('categories') && <span className='text-destructive ml-1'>*</span>}
            </label>
            <select
              {...register('categories')}
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer'
            >
              <option value=''>Выберите категорию</option>
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
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-on-surface'>
              Подкатегория
              {!watch('subcategories') && <span className='text-destructive ml-1'>*</span>}
            </label>
            <select
              {...register('subcategories')}
              disabled={!watch('categories')}
              className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <option value=''>Выберите подкатегорию</option>
              {currentSubcategories.map(sub => (
                <option
                  key={sub}
                  value={sub}
                >
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-on-surface'>
            Описание
            {!watch('description') && <span className='text-destructive ml-1'>*</span>}
          </label>
          <textarea
            {...register('description')}
            placeholder='Опишите что входит в услугу, ваш опыт, что получит заказчик...'
            rows={8}
            className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none'
            maxLength={2000}
          />
          <div className='flex items-center justify-between text-xs text-on-surface-variant'>
            <span className='flex items-center gap-1'>
              <Info className='w-3.5 h-3.5' />
              Минимум 50 символов. Используйте markdown для форматирования.
            </span>
            <span>{watch('description')?.length ?? 0}/2000</span>
          </div>
        </div>

        {/* Tags */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-on-surface'>
            Теги
            <span className='text-on-surface-variant font-normal ml-2'>(до 5 тегов)</span>
          </label>
          <div className='flex flex-wrap gap-2 mb-3'>
            {/* {formData.tags.map((tag, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='gap-1.5 pr-1.5'
              >
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className='p-0.5 rounded-full hover:bg-on-surface/10 transition-colors'
                >
                  <X className='w-3 h-3' />
                </button>
              </Badge>
            ))} */}
          </div>
          <div className='flex gap-2'>
            <input
              type='text'
              placeholder='Добавить тег'
              className='flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
              {...register('tags')}
            />
            <button
              // onClick={addTag}
              // disabled={!formData.tagInput.trim() || formData.tags.length >= 5}
              className='px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {/* <Plus className='w-5 h-5' /> */}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
