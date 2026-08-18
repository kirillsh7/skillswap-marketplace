'use client'

import { CATEGORIES_OPTIONS } from '../config/categories'
import { OrdersFormData, OrdersSchema } from '../model/schemas'
import { ordersAction } from '../model/actions/ordersAction'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useRef } from 'react'
import { useFieldArray, useWatch, useForm } from 'react-hook-form'
import { ROUTES } from '@/shared'
import Link from 'next/link'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  ImageIcon,
  Info,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

export const OrdersForm = () => {
  const steps = [
    { id: 1, title: 'Основное', icon: FileText },
    { id: 2, title: 'Галерея', icon: ImageIcon },
    { id: 3, title: 'Пакеты', icon: DollarSign },
    { id: 4, title: 'FAQ', icon: HelpCircle },
  ]

  const imageUploadInput = useRef<HTMLInputElement>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const {
    control,
    watch,
    reset,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<OrdersFormData>({
    resolver: zodResolver(OrdersSchema),
    mode: 'onChange',
    defaultValues: {
      packages: [],
    },
  })

  const tags = watch('tags') ?? []
  const selectedCategory = watch('categories')
  const [step, setStep] = useState(1)
  const [valueTag, setValueTag] = useState('')

  const currentSubcategories =
    CATEGORIES_OPTIONS.find(c => c.value === watch('categories'))?.subcategories || []

  const addTag = () => {
    const trimmed = valueTag.trim()
    if (watch('tags')?.includes(trimmed)) return
    setValue('tags', [...tags, trimmed])
    setValueTag('')
  }
  const removeTag = (id: number) => {
    setValue(
      'tags',
      watch('tags')?.filter((_, index) => index !== id),
    )
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const remainingSlots = 5 - imageFiles.length
    const newFiles = files.slice(0, remainingSlots)
    setImageFiles(prev => [...prev, ...newFiles])
    const newPreviews = newFiles.map(file => URL.createObjectURL(file))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }
  const handleButtonClick = () => {
    imageUploadInput.current?.click()
  }

  const {
    fields: packagesFields,
    append,
    remove,
  } = useFieldArray({
    control,

    name: 'packages',
  })

  const {
    fields: faqsFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: 'faq',
  })
  const packages = useWatch({
    control,
    name: 'packages',
  })

  const addFeature = (pkgIndex: number) => {
    const current = getValues(`packages.${pkgIndex}.features`) || []

    setValue(`packages.${pkgIndex}.features`, [...current, ''])
  }

  const removeFeature = (pkgIndex: number, featIndex: number) => {
    const current = getValues(`packages.${pkgIndex}.features`) || []
    setValue(
      `packages.${pkgIndex}.features`,
      current.filter((_, i) => i !== featIndex),
    )
  }

  async function onSubmit(data: OrdersFormData) {
    console.log('🔥 SUBMIT', data)
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('categories', data.categories)
    formData.append('subcategories', data.subcategories)
    formData.append('description', data.description || '')
    formData.append('tags', JSON.stringify(data.tags || []))
    formData.append('packages', JSON.stringify(data.packages || []))
    formData.append('faq', JSON.stringify(faqsFields || []))

    imageFiles.forEach(file => formData.append('images', file))
    const result = await ordersAction(formData)
    if (result.success) {
      reset()
      setImageFiles([])
      setImagePreviews([])
    }
  }

  const onError = (errors: unknown) => {
    console.log('🔥 VALIDATION ERROR', errors)
    console.log('Ошибки валидации:', errors)
  }
  useEffect(() => {
    console.log('OrdersForm mounted')
  }, [])
  useEffect(() => {
    setValue('subcategories', '')
  }, [selectedCategory])

  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-4'>
          <Link
            href={ROUTES.HOME}
            className='p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors'
          >
            <ArrowLeft className='w-5 h-5 text-on-surface-variant' />
          </Link>
          <div>
            <h1 className='text-2xl font-bold text-on-surface'>Создать услугу</h1>
            <p className='text-sm text-on-surface-variant'>Заполните информацию о вашей услуге</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient mb-8'>
        <div className='flex items-center justify-between'>
          {steps.map((s, index) => (
            <div
              key={s.id}
              className='flex items-center'
            >
              <button
                onClick={() => setStep(s.id)}
                type='button'
                className={`flex items-center gap-3 ${
                  step === s.id
                    ? 'text-primary'
                    : step > s.id
                      ? 'text-secondary'
                      : 'text-on-surface-variant'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    step === s.id
                      ? 'gradient-primary text-primary-foreground'
                      : step > s.id
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-surface-container-low'
                  }`}
                >
                  {step > s.id ? (
                    <CheckCircle className='w-5 h-5 text-accent-foreground ' />
                  ) : (
                    <s.icon className='w-5 h-5' />
                  )}
                </div>
                <span className='font-medium hidden sm:block'>{s.title}</span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 lg:w-24 h-0.5 mx-4 ${
                    step > s.id ? 'bg-secondary' : 'bg-surface-container'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className='bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden'>
        <form
          className='lg:p-8 py-0 space-y-6'
          onSubmit={e => {
            console.log('🔥 FORM SUBMIT EVENT', {
              submitter: (e.nativeEvent as SubmitEvent).submitter,
            })

            e.preventDefault()

            handleSubmit(onSubmit, onError)(e)
          }}
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <div>
                <h2 className='text-xl font-semibold text-on-surface mb-2'>Основная информация</h2>
                <p className='text-sm text-on-surface-variant'>
                  Опишите вашу услугу максимально подробно
                </p>
              </div>
              {/* Title*/}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-on-surface'>
                  Название услуги
                  {watch('title')?.length < 5 && <span className='text-destructive ml-1'>*</span>}
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
                    Минимум 5 символов
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
                  {watch('description')?.length < 20 && (
                    <span className='text-destructive ml-1'>*</span>
                  )}
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
                    Минимум 20 символов. Используйте markdown для форматирования.
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
                  {watch('tags')?.map((tag, idx) => (
                    <div
                      key={tag}
                      className='inline-flex items-center gap-1 bg-emerald-100 text-gray-800 text-sm px-2 py-1 rounded-xl'
                    >
                      <span>{tag}</span>
                      <button
                        type='button'
                        onClick={() => removeTag(idx)}
                        className='ml-0.5 w-4 h-4 inline-flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 focus:outline-none transition-colors'
                        aria-label='Remove tag'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={valueTag}
                    onChange={e => setValueTag(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder='Добавить тег'
                    className='flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                  />

                  <button
                    type='button'
                    onClick={addTag}
                    disabled={watch('tags')?.length === 5}
                    className='px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Plus className='w-5 h-5' />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 2: Gallery */}
          {step === 2 && (
            <>
              <div className='p-6 lg:p-8 space-y-6'>
                <div>
                  <h2 className='text-xl font-semibold text-on-surface mb-2'>Галерея работ</h2>
                  <p className='text-sm text-on-surface-variant'>
                    Добавьте изображения ваших работ (до 5 фото)
                  </p>
                </div>

                {/* Upload Area */}
                <div
                  className='border-2 border-dashed border-outline-variant rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-surface-container-low/50 transition-all'
                  onClick={handleButtonClick}
                >
                  <div className='w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center'>
                    <Upload className='w-8 h-8 text-on-surface-variant' />
                  </div>
                  <p className='text-on-surface font-medium mb-1'>Нажмите для загрузки</p>
                  <p className='text-sm text-on-surface-variant'>или перетащите файлы сюда</p>
                  <p className='text-xs text-on-surface-variant mt-2'>PNG, JPG до 5MB</p>
                </div>
                {/* Hidden File Input */}
                <input
                  type='file'
                  accept='image/png, image/jpeg, image/jpg'
                  multiple
                  onChange={handleFileSelect}
                  className='hidden'
                  ref={imageUploadInput}
                />
              </div>
              {/* Область для превью */}
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {imagePreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className='relative group aspect-video rounded-xl overflow-hidden bg-surface-container'
                  >
                    <img
                      src={src}
                      alt='preview'
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      onClick={() => removeImage(idx)}
                      className='absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-destructive'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
          {/* Step 3: Packages */}
          {step === 3 && (
            <div className='p-6 lg:p-8 space-y-6'>
              <div>
                <h2 className='text-xl font-semibold text-on-surface mb-2'>Пакеты услуг</h2>
                <p className='text-sm text-on-surface-variant'>
                  Настройте варианты и цены для заказчиков
                </p>
              </div>

              <div className='space-y-6'>
                {packagesFields.length === 0 && (
                  <p className='text-sm text-on-surface-variant text-center py-8'>
                    У вас пока нет пакетов. Добавьте хотя бы один, чтобы описать варианты услуги.
                  </p>
                )}

                {packagesFields.map((pkg, pkgIndex) => {
                  const features = packages?.[pkgIndex]?.features ?? []
                  return (
                    <div
                      key={pkg.id}
                      className='bg-surface-container-low rounded-2xl p-6 space-y-4'
                    >
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-semibold text-on-surface flex items-center gap-2'>
                          {pkg.name || `Пакет ${pkgIndex + 1}`}
                        </h3>
                        <button
                          type='button'
                          onClick={() => remove(pkgIndex)}
                          className='p-2 text-on-surface-variant hover:text-destructive transition-colors'
                          title='Удалить пакет'
                        >
                          <X className='w-5 h-5' />
                        </button>
                      </div>

                      {/* Название пакета */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-on-surface'>
                          Название пакета
                        </label>
                        <input
                          type='text'
                          {...register(`packages.${pkgIndex}.name`)}
                          placeholder='Базовый, Стандарт и т.д.'
                          className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                        />
                      </div>

                      {/* Цена, Срок, Правки */}
                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                        <div className='space-y-2'>
                          <label className='block text-sm font-medium text-on-surface'>
                            Цена (₽)
                            <span className='text-destructive ml-1'>*</span>
                          </label>
                          <div className='relative'>
                            <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
                            <input
                              type='number'
                              {...register(`packages.${pkgIndex}.price`, { valueAsNumber: true })}
                              min={1}
                              placeholder='0'
                              className='w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                            />
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <label className='block text-sm font-medium text-on-surface'>
                            Срок (дней)
                            <span className='text-destructive ml-1'>*</span>
                          </label>
                          <div className='relative'>
                            <Clock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
                            <input
                              type='number'
                              {...register(`packages.${pkgIndex}.delivery`)}
                              min={1}
                              placeholder='0'
                              className='w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                            />
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <label className='block text-sm font-medium text-on-surface'>
                            Правки
                          </label>
                          <select
                            {...register(`packages.${pkgIndex}.revisions`)}
                            className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer'
                          >
                            <option value='0'>Без правок</option>
                            <option value='1'>1 правка</option>
                            <option value='2'>2 правки</option>
                            <option value='3'>3 правки</option>
                            <option value='5'>5 правок</option>
                            <option value='unlimited'>Неограниченно</option>
                          </select>
                        </div>
                      </div>

                      {/* Описание пакета */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-on-surface'>
                          Краткое описание пакета
                        </label>
                        <input
                          type='text'
                          {...register(`packages.${pkgIndex}.description`)}
                          placeholder='Например: Идеально для небольших проектов'
                          className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                          maxLength={100}
                        />
                      </div>

                      {/* Что входит */}
                      <div className='space-y-2'>
                        <label className='block text-sm font-medium text-on-surface'>
                          Что входит
                          <span className='text-destructive ml-1'>*</span>
                        </label>
                        <div className='space-y-2'>
                          {features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className='flex gap-2'
                            >
                              <div className='relative flex-1'>
                                <CheckCircle2 className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary' />
                                <input
                                  type='text'
                                  placeholder='Например: До 5 экранов'
                                  {...register(`packages.${pkgIndex}.features.${featureIndex}`)}
                                  className='w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                                />
                              </div>
                              {features.length > 1 && (
                                <button
                                  type='button'
                                  onClick={() => removeFeature(pkgIndex, featureIndex)}
                                  className='p-2.5 rounded-xl text-on-surface-variant hover:text-destructive hover:bg-destructive/10 transition-colors'
                                >
                                  <X className='w-5 h-5' />
                                </button>
                              )}
                            </div>
                          ))}
                          {features.length < 5 && (
                            <button
                              type='button'
                              onClick={() => addFeature(pkgIndex)}
                              className='flex items-center gap-2 text-sm text-primary hover:underline'
                            >
                              <Plus className='w-4 h-4' />
                              Добавить пункт
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Кнопка добавления нового пакета */}
                {packagesFields.length < 5 && (
                  <button
                    type='button'
                    onClick={() =>
                      append({
                        name: '',
                        price: 0,
                        delivery: '',
                        revisions: '1',
                        features: [''],
                        description: '',
                      })
                    }
                    className='w-full py-4 border-2 border-dashed border-outline-variant rounded-2xl text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2'
                  >
                    <Plus className='w-5 h-5' />
                    Добавить пакет
                  </button>
                )}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className='p-4 lg:p-6 space-y-4'>
              <div>
                <h2 className='text-lg font-semibold text-on-surface'>Часто задаваемые вопросы</h2>
                <p className='text-sm text-on-surface-variant'>
                  Добавьте ответы на популярные вопросы, чтобы покупателям было проще принять
                  решение.
                </p>
              </div>

              <div className='space-y-3'>
                {faqsFields.map((faq, index) => (
                  <div
                    key={faq.id}
                    className='bg-surface-container-low rounded-xl p-4 space-y-3'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-medium text-on-surface-variant'>
                        {index + 1}
                      </span>
                      {faqsFields.length >= 1 && (
                        <button
                          type='button'
                          onClick={() => removeFaq(index)}
                          className='p-1.5 rounded-lg text-on-surface-variant hover:text-destructive hover:bg-destructive/10 transition-colors'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>

                    <div className='space-y-1.5'>
                      <label className='block text-xs font-medium text-on-surface'>Вопрос</label>
                      <input
                        type='text'
                        {...register(`faq.${index}.question`)}
                        placeholder='Например: Какие исходные материалы нужны?'
                        className='w-full px-3 py-2.5 rounded-lg bg-surface-container text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
                      />
                    </div>

                    <div className='space-y-1.5'>
                      <label className='block text-xs font-medium text-on-surface'>Ответ</label>
                      <textarea
                        {...register(`faq.${index}.answer`)}
                        placeholder='Введите ответ на вопрос...'
                        rows={2}
                        className='w-full px-3 py-2.5 rounded-lg bg-surface-container text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none'
                      />
                    </div>
                  </div>
                ))}
              </div>

              {faqsFields.length < 10 && (
                <button
                  type='button'
                  onClick={() => appendFaq({ question: '', answer: '' })}
                  className='flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors'
                >
                  <Plus className='w-4 h-4' />
                  <span className='text-sm'>Добавить вопрос</span>
                </button>
              )}
            </div>
          )}
          {/* Navigation */}
          <div className='flex items-center justify-between pt-6 border-t border-outline-variant bg-surface-container-lowest'>
            <button
              onClick={() => setStep(step - 1)}
              type='button'
              disabled={step === 1}
              className='px-6 py-3 rounded-full text-on-surface-variant font-medium hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Назад
            </button>

            <div className='flex items-center gap-3'>
              {!isValid && (
                <span className='text-sm text-on-surface-variant flex items-center gap-1.5'>
                  <AlertCircle className='w-4 h-4 text-amber-500' />
                  Заполните обязательные поля
                </span>
              )}
              {step < 4 ? (
                <button
                  type='button'
                  onClick={() => {
                    console.log('NEXT CLICK', step)
                    setStep(prev => prev + 1)
                  }}
                  disabled={!isValid}
                  className='px-6 py-3 rounded-full gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Далее
                </button>
              ) : (
                <button className='px-8 py-3 rounded-full gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed '>
                  Опубликовать услугу
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
