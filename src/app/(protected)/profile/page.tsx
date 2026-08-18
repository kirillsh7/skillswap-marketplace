import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma/prisma'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/shared'
import Link from 'next/link'
import {
  Package,
  CheckCircle2,
  Clock,
  Star,
  Plus,
  ArrowRight,
  Settings,
  Mail,
  CalendarDays,
  Briefcase,
  Tag,
} from 'lucide-react'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      services: {
        select: {
          id: true,
          title: true,
          published: true,
          categories: true,
          subcategories: true,
          images: true,
          packages: true,
          tags: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) redirect('/login')

  const totalServices = user.services.length
  const publishedServices = user.services.filter(o => o.published)
  const draftServices = user.services.filter(o => !o.published)
  const allTags = new Set<string>()
  user.services.forEach(service => {
    const tags = (service.tags as string[]) || []
    tags.forEach(t => allTags.add(t))
  })

  // Средняя цена: берём первый пакет каждого заказа и считаем среднее
  const prices = user.services
    .map(service => {
      const packages = (service.packages as any[]) || []
      if (packages.length > 0 && packages[0]?.price) {
        return Number(packages[0].price)
      }
      return null
    })
    .filter((p): p is number => p !== null)
  const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0

  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || user.email?.[0] || ''}`.toUpperCase()
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Пользователь'

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Обложка профиля */}
      <div className='bg-surface-container-lowest rounded-3xl shadow-ambient overflow-hidden'>
        <div className='h-40 bg-gradient-to-r from-primary to-primary-container relative'>
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent' />
        </div>
        <div className='px-6 md:px-10 pb-6 -mt-14 relative'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
            <div className='flex items-end gap-4'>
              <div className='w-28 h-28 rounded-full border-4 border-surface-container-lowest bg-surface-container flex items-center justify-center text-4xl font-bold text-on-surface shrink-0'>
                {initials}
              </div>
              <div className='pb-1'>
                <h1 className='text-2xl md:text-3xl font-bold text-on-surface'>{fullName}</h1>
                <div className='flex items-center gap-2 mt-1'>
                  <span className='bg-secondary-container/30 text-on-secondary-container text-sm px-3 py-1 rounded-full font-medium'>
                    {user.role === 'ADMIN' ? 'Администратор' : 'Исполнитель'}
                  </span>
                  <span className='text-on-surface-variant text-sm flex items-center gap-1'>
                    <CalendarDays className='w-4 h-4' />
                    {new Date(user.createdAt).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex gap-3'>
              <button className='flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-highest transition-colors'>
                <Settings className='w-4 h-4' />
                Настройки
              </button>
              <Link
                href={ROUTES.SERVICES}
                className='flex items-center gap-2 px-5 py-2.5 rounded-full gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity'
              >
                <Plus className='w-4 h-4' />
                Создать услугу
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-surface-container-lowest rounded-2xl p-5 shadow-ambient'>
          <div className='flex items-center justify-between'>
            <span className='text-on-surface-variant text-sm'>Всего услуг</span>
            <Package className='w-5 h-5 text-primary' />
          </div>
          <p className='text-3xl font-bold mt-2'>{totalServices}</p>
        </div>
        <div className='bg-surface-container-lowest rounded-2xl p-5 shadow-ambient'>
          <div className='flex items-center justify-between'>
            <span className='text-on-surface-variant text-sm'>Опубликовано</span>
            <CheckCircle2 className='w-5 h-5 text-secondary' />
          </div>
          <p className='text-3xl font-bold mt-2'>{publishedServices.length}</p>
        </div>
        <div className='bg-surface-container-lowest rounded-2xl p-5 shadow-ambient'>
          <div className='flex items-center justify-between'>
            <span className='text-on-surface-variant text-sm'>Черновики</span>
            <Clock className='w-5 h-5 text-amber-500' />
          </div>
          <p className='text-3xl font-bold mt-2'>{draftServices.length}</p>
        </div>
        <div className='bg-surface-container-lowest rounded-2xl p-5 shadow-ambient'>
          <div className='flex items-center justify-between'>
            <span className='text-on-surface-variant text-sm'>Средняя цена</span>
            <Star className='w-5 h-5 text-tertiary' />
          </div>
          <p className='text-3xl font-bold mt-2'>{avgPrice ? `${avgPrice} ₽` : '—'}</p>
        </div>
      </div>

      {/* Навыки (теги) */}
      {allTags.size > 0 && (
        <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient'>
          <h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
            <Tag className='w-5 h-5 text-on-surface-variant' />
            Навыки и теги
          </h2>
          <div className='flex flex-wrap gap-2'>
            {Array.from(allTags).map(tag => (
              <span
                key={tag}
                className='bg-surface-container-low px-3 py-1.5 rounded-full text-sm font-medium'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Контакты */}
      <div className='grid md:grid-cols-2 gap-4'>
        <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient flex items-center gap-3'>
          <Mail className='w-6 h-6 text-primary' />
          <div>
            <p className='text-sm text-on-surface-variant'>Email</p>
            <p className='font-medium'>{user.email}</p>
          </div>
        </div>
        <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient flex items-center gap-3'>
          <Briefcase className='w-6 h-6 text-primary' />
          <div>
            <p className='text-sm text-on-surface-variant'>Специализация</p>
            <p className='font-medium'>{user.services[0]?.categories || 'Не указана'}</p>
          </div>
        </div>
      </div>

      {/* Последние услуги */}
      <div className='bg-surface-container-lowest rounded-2xl p-6 shadow-ambient'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Последние услуги</h2>
          <Link
            href='/dashboard/my-services'
            className='text-primary hover:underline flex items-center gap-1'
          >
            Все услуги <ArrowRight className='w-4 h-4' />
          </Link>
        </div>
        {user.services.length === 0 ? (
          <p className='text-on-surface-variant'>У вас пока нет услуг. Создайте первую!</p>
        ) : (
          <div className='space-y-3'>
            {user.services.slice(0, 5).map(order => {
              const images = (order.images as string[]) || []
              const image = images[0]
              const packages = (order.packages as any[]) || []
              const price = packages[0]?.price ? `${packages[0].price} ₽` : 'Цена не указана'
              return (
                <Link
                  key={order.id}
                  href={`${ROUTES.SERVICES}/${order.id}`}
                  className='flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors'
                >
                  {image ? (
                    <img
                      src={image}
                      alt=''
                      className='w-16 h-16 rounded-xl object-cover'
                    />
                  ) : (
                    <div className='w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center text-xl'>
                      📦
                    </div>
                  )}
                  <div className='flex-1 min-w-0'>
                    <p className='font-medium truncate'>{order.title}</p>
                    <p className='text-sm text-on-surface-variant'>
                      {order.categories} / {order.subcategories}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>{price}</p>
                    <p
                      className={`text-xs ${order.published ? 'text-secondary' : 'text-amber-500'}`}
                    >
                      {order.published ? 'Опубликовано' : 'Черновик'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
