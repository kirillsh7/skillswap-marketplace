'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  Info,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  HelpCircle,
  Save,
  Eye,
} from 'lucide-react'
import { Badge } from '@/shared/ui'
import { categories, packages as defaultPackages } from './create-constants'
import { Package, FAQ } from './create-type.d'
import { ROUTES } from '@/shared'
import { OrdersForm } from '@/features'
export default function CreateServicePage() {
  const [step, setStep] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [packages, setPackages] = useState<Package[]>(defaultPackages)
  const [faqs, setFaqs] = useState<FAQ[]>([{ id: '1', question: '', answer: '' }])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    tagInput: '',
  })

  const currentSubcategories = categories.find(c => c.id === selectedCategory)?.subcategories || []

  const steps = [
    { id: 1, title: 'Основное', icon: FileText },
    { id: 2, title: 'Галерея', icon: ImageIcon },
    { id: 3, title: 'Пакеты', icon: DollarSign },
    { id: 4, title: 'FAQ', icon: HelpCircle },
  ]

  const handleImageUpload = () => {
    // Simulating image upload with placeholder
    const placeholders = [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    ]
    if (images.length < 5) {
      setImages([...images, placeholders[images.length % 3]])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (formData.tagInput.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.tagInput.trim()],
        tagInput: '',
      })
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    })
  }

  const updatePackage = (packageId: string, field: keyof Package, value: string | string[]) => {
    setPackages(packages.map(pkg => (pkg.id === packageId ? { ...pkg, [field]: value } : pkg)))
  }

  const addPackageFeature = (packageId: string) => {
    setPackages(
      packages.map(pkg =>
        pkg.id === packageId ? { ...pkg, features: [...pkg.features, ''] } : pkg,
      ),
    )
  }

  const updatePackageFeature = (packageId: string, featureIndex: number, value: string) => {
    setPackages(
      packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, features: pkg.features.map((f, i) => (i === featureIndex ? value : f)) }
          : pkg,
      ),
    )
  }

  const removePackageFeature = (packageId: string, featureIndex: number) => {
    setPackages(
      packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, features: pkg.features.filter((_, i) => i !== featureIndex) }
          : pkg,
      ),
    )
  }

  const addFaq = () => {
    if (faqs.length < 10) {
      setFaqs([...faqs, { id: Date.now().toString(), question: '', answer: '' }])
    }
  }

  const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq => (faq.id === id ? { ...faq, [field]: value } : faq)))
  }

  const removeFaq = (id: string) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter(faq => faq.id !== id))
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.title.length >= 10 &&
          formData.description.length >= 50 &&
          selectedCategory &&
          selectedSubcategory
        )
      case 2:
        return images.length >= 1
      case 3:
        return packages.every(
          pkg => pkg.price && pkg.deliveryDays && pkg.features.some(f => f.trim()),
        )
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className='container m-auto w-250'>
      <OrdersForm />
    </div>
    // <div className='max-w-4xl mx-auto'>
    //   {/* Header */}
    //   <div className='flex items-center justify-between mb-8'>
    //     <div className='flex items-center gap-4'>
    //       <Link
    //         href={ROUTES.HOME}
    //         className='p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors'
    //       >
    //         <ArrowLeft className='w-5 h-5 text-on-surface-variant' />
    //       </Link>
    //       <div>
    //         <h1 className='text-2xl font-bold text-on-surface'>Создать услугу</h1>
    //         <p className='text-sm text-on-surface-variant'>Заполните информацию о вашей услуге</p>
    //       </div>
    //     </div>
    //     {/* <div className='flex items-center gap-3'>
    //       <button className='px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-colors flex items-center gap-2'>
    //         <Eye className='w-4 h-4' />
    //         <span className='hidden sm:inline'>Предпросмотр</span>
    //       </button>
    //       <button className='px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium hover:bg-surface-container transition-colors flex items-center gap-2'>
    //         <Save className='w-4 h-4' />
    //         <span className='hidden sm:inline'>Сохранить черновик</span>
    //       </button>
    //     </div> */}
    //   </div>

    //   {/* Progress Steps */}
    //   <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient mb-8'>
    //     <div className='flex items-center justify-between'>
    //       {steps.map((s, index) => (
    //         <div
    //           key={s.id}
    //           className='flex items-center'
    //         >
    //           <button
    //             onClick={() => setStep(s.id)}
    //             className={`flex items-center gap-3 ${
    //               step === s.id
    //                 ? 'text-primary'
    //                 : step > s.id
    //                   ? 'text-secondary'
    //                   : 'text-on-surface-variant'
    //             }`}
    //           >
    //             <div
    //               className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
    //                 step === s.id
    //                   ? 'gradient-primary text-primary-foreground'
    //                   : step > s.id
    //                     ? 'bg-secondary text-secondary-foreground'
    //                     : 'bg-surface-container-low'
    //               }`}
    //             >
    //               {step > s.id ? (
    //                 <CheckCircle2 className='w-5 h-5' />
    //               ) : (
    //                 <s.icon className='w-5 h-5' />
    //               )}
    //             </div>
    //             <span className='font-medium hidden sm:block'>{s.title}</span>
    //           </button>
    //           {/* {index <div steps.length - 1 && (
    //             <div
    //               className={`w-12 lg:w-24 h-0.5 mx-4 ${
    //                 step > s.id ? 'bg-secondary' : 'bg-surface-container'
    //               }`}
    //             />
    //           )} */}
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Step Content */}
    //   <div className='bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden'>
    //     {/* Step 1: Basic Info */}
    //     {step === 1 && (
    //       <div className='p-6 lg:p-8 space-y-6'>
    //         <div>
    //           <h2 className='text-xl font-semibold text-on-surface mb-2'>Основная информация</h2>
    //           <p className='text-sm text-on-surface-variant'>
    //             Опишите вашу услугу максимально подробно
    //           </p>
    //         </div>

    //         {/* Title */}
    //         <div className='space-y-2'>
    //           <label className='block text-sm font-medium text-on-surface'>
    //             Название услуги
    //             <span className='text-destructive ml-1'>*</span>
    //           </label>
    //           <input
    //             type='text'
    //             value={formData.title}
    //             onChange={e => setFormData({ ...formData, title: e.target.value })}
    //             placeholder='Например: Создание современного UI/UX дизайна для мобильного приложения'
    //             className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //             maxLength={100}
    //           />
    //           <div className='flex items-center justify-between text-xs text-on-surface-variant'>
    //             <span className='flex items-center gap-1'>
    //               <Info className='w-3.5 h-3.5' />
    //               Минимум 10 символов
    //             </span>
    //             <span>{formData.title.length}/100</span>
    //           </div>
    //         </div>

    //         {/* Category */}
    //         <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    //           <div className='space-y-2'>
    //             <label className='block text-sm font-medium text-on-surface'>
    //               Категория
    //               <span className='text-destructive ml-1'>*</span>
    //             </label>
    //             <select
    //               value={selectedCategory}
    //               onChange={e => {
    //                 setSelectedCategory(e.target.value)
    //                 setSelectedSubcategory('')
    //               }}
    //               className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer'
    //             >
    //               <option value=''>Выберите категорию</option>
    //               {categories.map(cat => (
    //                 <option
    //                   key={cat.id}
    //                   value={cat.id}
    //                 >
    //                   {cat.label}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //           <div className='space-y-2'>
    //             <label className='block text-sm font-medium text-on-surface'>
    //               Подкатегория
    //               <span className='text-destructive ml-1'>*</span>
    //             </label>
    //             <select
    //               value={selectedSubcategory}
    //               onChange={e => setSelectedSubcategory(e.target.value)}
    //               disabled={!selectedCategory}
    //               className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
    //             >
    //               <option value=''>Выберите подкатегорию</option>
    //               {currentSubcategories.map(sub => (
    //                 <option
    //                   key={sub}
    //                   value={sub}
    //                 >
    //                   {sub}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //         </div>

    //         {/* Description */}
    //         <div className='space-y-2'>
    //           <label className='block text-sm font-medium text-on-surface'>
    //             Описание
    //             <span className='text-destructive ml-1'>*</span>
    //           </label>
    //           <textarea
    //             value={formData.description}
    //             onChange={e => setFormData({ ...formData, description: e.target.value })}
    //             placeholder='Опишите что входит в услугу, ваш опыт, что получит заказчик...'
    //             rows={8}
    //             className='w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none'
    //             maxLength={2000}
    //           />
    //           <div className='flex items-center justify-between text-xs text-on-surface-variant'>
    //             <span className='flex items-center gap-1'>
    //               <Info className='w-3.5 h-3.5' />
    //               Минимум 50 символов. Используйте markdown для форматирования.
    //             </span>
    //             <span>{formData.description.length}/2000</span>
    //           </div>
    //         </div>

    //         {/* Tags */}
    //         <div className='space-y-2'>
    //           <label className='block text-sm font-medium text-on-surface'>
    //             Теги
    //             <span className='text-on-surface-variant font-normal ml-2'>(до 5 тегов)</span>
    //           </label>
    //           <div className='flex flex-wrap gap-2 mb-3'>
    //             {formData.tags.map((tag, index) => (
    //               <Badge
    //                 key={index}
    //                 variant='secondary'
    //                 className='gap-1.5 pr-1.5'
    //               >
    //                 {tag}
    //                 <button
    //                   onClick={() => removeTag(index)}
    //                   className='p-0.5 rounded-full hover:bg-on-surface/10 transition-colors'
    //                 >
    //                   <X className='w-3 h-3' />
    //                 </button>
    //               </Badge>
    //             ))}
    //           </div>
    //           <div className='flex gap-2'>
    //             <input
    //               type='text'
    //               value={formData.tagInput}
    //               onChange={e => setFormData({ ...formData, tagInput: e.target.value })}
    //               onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
    //               placeholder='Добавить тег'
    //               className='flex-1 px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //               disabled={formData.tags.length >= 5}
    //             />
    //             <button
    //               onClick={addTag}
    //               disabled={!formData.tagInput.trim() || formData.tags.length >= 5}
    //               className='px-4 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    //             >
    //               <Plus className='w-5 h-5' />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Step 2: Gallery */}
    //     {step === 2 && (
    //       <div className='p-6 lg:p-8 space-y-6'>
    //         <div>
    //           <h2 className='text-xl font-semibold text-on-surface mb-2'>Галерея работ</h2>
    //           <p className='text-sm text-on-surface-variant'>
    //             Добавьте изображения ваших работ (до 5 фото)
    //           </p>
    //         </div>

    //         {/* Upload Area */}
    //         <div
    //           onClick={handleImageUpload}
    //           className='border-2 border-dashed border-outline-variant rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-surface-container-low/50 transition-all'
    //         >
    //           <div className='w-16 h-16 rounded-full bg-surface-container-low mx-auto mb-4 flex items-center justify-center'>
    //             <Upload className='w-8 h-8 text-on-surface-variant' />
    //           </div>
    //           <p className='text-on-surface font-medium mb-1'>Нажмите для загрузки</p>
    //           <p className='text-sm text-on-surface-variant'>или перетащите файлы сюда</p>
    //           <p className='text-xs text-on-surface-variant mt-2'>PNG, JPG до 5MB</p>
    //         </div>

    //         {/* Image Grid */}
    //         {images.length > 0 && (
    //           <div className='space-y-3'>
    //             <p className='text-sm font-medium text-on-surface'>Загруженные изображения</p>
    //             <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
    //               {images.map((img, index) => (
    //                 <div
    //                   key={index}
    //                   className='relative group aspect-video rounded-xl overflow-hidden bg-surface-container'
    //                 >
    //                   <img
    //                     src={img}
    //                     alt=''
    //                     className='w-full h-full object-cover'
    //                   />
    //                   <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2'>
    //                     <button className='p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors'>
    //                       <GripVertical className='w-5 h-5' />
    //                     </button>
    //                     <button
    //                       onClick={() => removeImage(index)}
    //                       className='p-2 rounded-lg bg-white/20 text-white hover:bg-destructive transition-colors'
    //                     >
    //                       <Trash2 className='w-5 h-5' />
    //                     </button>
    //                   </div>
    //                   {index === 0 && (
    //                     <Badge className='absolute top-2 left-2 bg-primary'>Главное</Badge>
    //                   )}
    //                 </div>
    //               ))}
    //               {/* {images.length <div 5 && (
    //                 <button
    //                   onClick={handleImageUpload}
    //                   className='aspect-video rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors'
    //                 >
    //                   <Plus className='w-6 h-6' />
    //                   <span className='text-sm'>Добавить</span>
    //                 </button>
    //               )} */}
    //             </div>
    //           </div>
    //         )}

    //         {/* Tips */}
    //         <div className='bg-surface-container-low rounded-xl p-4'>
    //           <div className='flex items-start gap-3'>
    //             <Info className='w-5 h-5 text-primary shrink-0 mt-0.5' />
    //             <div className='text-sm text-on-surface-variant'>
    //               <p className='font-medium text-on-surface mb-1'>Советы по фотографиям:</p>
    //               <ul className='list-disc list-inside space-y-1'>
    //                 <li>Первое фото будет главным в каталоге</li>
    //                 <li>Используйте качественные скриншоты работ</li>
    //                 <li>Покажите процесс и результат</li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Step 3: Packages */}
    //     {step === 3 && (
    //       <div className='p-6 lg:p-8 space-y-6'>
    //         <div>
    //           <h2 className='text-xl font-semibold text-on-surface mb-2'>Пакеты услуг</h2>
    //           <p className='text-sm text-on-surface-variant'>
    //             Настройте варианты и цены для заказчиков
    //           </p>
    //         </div>

    //         <div className='space-y-6'>
    //           {packages.map((pkg, pkgIndex) => (
    //             <div
    //               key={pkg.id}
    //               className='bg-surface-container-low rounded-2xl p-6 space-y-4'
    //             >
    //               <div className='flex items-center justify-between'>
    //                 <h3 className='text-lg font-semibold text-on-surface flex items-center gap-2'>
    //                   {pkg.name}
    //                   {pkgIndex === 1 && <Badge variant='trust'>Рекомендуется</Badge>}
    //                 </h3>
    //               </div>

    //               <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
    //                 <div className='space-y-2'>
    //                   <label className='block text-sm font-medium text-on-surface'>
    //                     Цена (₽)
    //                     <span className='text-destructive ml-1'>*</span>
    //                   </label>
    //                   <div className='relative'>
    //                     <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
    //                     <input
    //                       type='number'
    //                       value={pkg.price}
    //                       onChange={e => updatePackage(pkg.id, 'price', e.target.value)}
    //                       placeholder='0'
    //                       className='w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //                     />
    //                   </div>
    //                 </div>
    //                 <div className='space-y-2'>
    //                   <label className='block text-sm font-medium text-on-surface'>
    //                     Срок (дней)
    //                     <span className='text-destructive ml-1'>*</span>
    //                   </label>
    //                   <div className='relative'>
    //                     <Clock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant' />
    //                     <input
    //                       type='number'
    //                       value={pkg.deliveryDays}
    //                       onChange={e => updatePackage(pkg.id, 'deliveryDays', e.target.value)}
    //                       placeholder='0'
    //                       min='1'
    //                       className='w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //                     />
    //                   </div>
    //                 </div>
    //                 <div className='space-y-2'>
    //                   <label className='block text-sm font-medium text-on-surface'>Правки</label>
    //                   <select
    //                     value={pkg.revisions}
    //                     onChange={e => updatePackage(pkg.id, 'revisions', e.target.value)}
    //                     className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow appearance-none cursor-pointer'
    //                   >
    //                     <option value='0'>Без правок</option>
    //                     <option value='1'>1 правка</option>
    //                     <option value='2'>2 правки</option>
    //                     <option value='3'>3 правки</option>
    //                     <option value='5'>5 правок</option>
    //                     <option value='unlimited'>Неограниченно</option>
    //                   </select>
    //                 </div>
    //               </div>

    //               {/* Package Description */}
    //               <div className='space-y-2'>
    //                 <label className='block text-sm font-medium text-on-surface'>
    //                   Краткое описание пакета
    //                 </label>
    //                 <input
    //                   type='text'
    //                   value={pkg.description}
    //                   onChange={e => updatePackage(pkg.id, 'description', e.target.value)}
    //                   placeholder='Например: Идеально для небольших проектов'
    //                   className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //                   maxLength={100}
    //                 />
    //               </div>

    //               {/* Features */}
    //               <div className='space-y-2'>
    //                 <label className='block text-sm font-medium text-on-surface'>
    //                   Что входит
    //                   <span className='text-destructive ml-1'>*</span>
    //                 </label>
    //                 <div className='space-y-2'>
    //                   {pkg.features.map((feature, featureIndex) => (
    //                     <div
    //                       key={featureIndex}
    //                       className='flex gap-2'
    //                     >
    //                       <div className='relative flex-1'>
    //                         <CheckCircle2 className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary' />
    //                         <input
    //                           type='text'
    //                           value={feature}
    //                           onChange={e =>
    //                             updatePackageFeature(pkg.id, featureIndex, e.target.value)
    //                           }
    //                           placeholder='Например: До 5 экранов'
    //                           className='w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //                         />
    //                       </div>
    //                       {pkg.features.length > 1 && (
    //                         <button
    //                           onClick={() => removePackageFeature(pkg.id, featureIndex)}
    //                           className='p-2.5 rounded-xl text-on-surface-variant hover:text-destructive hover:bg-destructive/10 transition-colors'
    //                         >
    //                           <X className='w-5 h-5' />
    //                         </button>
    //                       )}
    //                     </div>
    //                   ))}
    //                 </div>
    //                 {/* {pkg.features.length <div 8 && (
    //                   <button
    //                     onClick={() => addPackageFeature(pkg.id)}
    //                     className='flex items-center gap-2 text-sm text-primary hover:underline'
    //                   >
    //                     <Plus className='w-4 h-4' />
    //                     Добавить пункт
    //                   </button>
    //                 )} */}
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Step 4: FAQ */}
    //     {step === 4 && (
    //       <div className='p-6 lg:p-8 space-y-6'>
    //         <div>
    //           <h2 className='text-xl font-semibold text-on-surface mb-2'>
    //             Часто задаваемые вопросы
    //           </h2>
    //           <p className='text-sm text-on-surface-variant'>
    //             Добавьте ответы на типичные вопросы заказчиков
    //           </p>
    //         </div>

    //         <div className='space-y-4'>
    //           {faqs.map((faq, index) => (
    //             <div
    //               key={faq.id}
    //               className='bg-surface-container-low rounded-2xl p-5 space-y-4'
    //             >
    //               <div className='flex items-start justify-between gap-4'>
    //                 <span className='w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-sm font-medium text-on-surface-variant shrink-0'>
    //                   {index + 1}
    //                 </span>
    //                 {faqs.length > 1 && (
    //                   <button
    //                     onClick={() => removeFaq(faq.id)}
    //                     className='p-2 rounded-lg text-on-surface-variant hover:text-destructive hover:bg-destructive/10 transition-colors'
    //                   >
    //                     <Trash2 className='w-5 h-5' />
    //                   </button>
    //                 )}
    //               </div>
    //               <div className='space-y-2'>
    //                 <label className='block text-sm font-medium text-on-surface'>Вопрос</label>
    //                 <input
    //                   type='text'
    //                   value={faq.question}
    //                   onChange={e => updateFaq(faq.id, 'question', e.target.value)}
    //                   placeholder='Например: Какие исходные материалы нужны?'
    //                   className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow'
    //                 />
    //               </div>
    //               <div className='space-y-2'>
    //                 <label className='block text-sm font-medium text-on-surface'>Ответ</label>
    //                 <textarea
    //                   value={faq.answer}
    //                   onChange={e => updateFaq(faq.id, 'answer', e.target.value)}
    //                   placeholder='Введите ответ на вопрос...'
    //                   rows={3}
    //                   className='w-full px-4 py-3 rounded-xl bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none'
    //                 />
    //               </div>
    //             </div>
    //           ))}
    //         </div>

    //         {/* {faqs.length <div 10 && (
    //           <button
    //             onClick={addFaq}
    //             className='flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-outline-variant text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors w-full justify-center'
    //           >
    //             <Plus className='w-5 h-5' />
    //             Добавить вопрос
    //           </button>
    //         )} */}
    //       </div>
    //     )}

    // //     {/* Navigation */}
    //     <div className='flex items-center justify-between p-6 lg:p-8 border-t border-outline-variant bg-surface-container-lowest'>
    //       <button
    //         onClick={() => setStep(step - 1)}
    //         disabled={step === 1}
    //         className='px-6 py-3 rounded-full text-on-surface-variant font-medium hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    //       >
    //         Назад
    //       </button>
    //       <div className='flex items-center gap-3'>
    //         {!isStepValid() && step < 4 && (
    //           <span className='text-sm text-on-surface-variant flex items-center gap-1.5'>
    //             <AlertCircle className='w-4 h-4 text-amber-500' />
    //             Заполните обязательные поля
    //           </span>
    //         )}
    //         {/* {step <div 4 ? (
    //           <button
    //             onClick={() => setStep(step + 1)}
    //             disabled={!isStepValid()}
    //             className='px-6 py-3 rounded-full gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
    //           >
    //             Далее
    //           </button>
    //         ) : (
    //           <button className='px-8 py-3 rounded-full gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity'>
    //             Опубликовать услугу
    //           </button>
    //         )} */}
    //       </div>
    //     </div>
    // </div>
    // </div>
  )
}
