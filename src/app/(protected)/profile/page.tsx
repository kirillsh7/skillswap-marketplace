import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma/prisma'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
      orders: { select: { id: true, title: true, published: true } },
    },
  })

  if (!user) redirect('/login')

  const publishedCount = user.orders.filter(o => o.published).length
  const totalOrders = user.orders.length
  const initials =
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || user.email?.[0] || ''}`.toUpperCase()

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <h1 className='text-3xl font-bold'>Профиль</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Карточка пользователя */}
        <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6 flex flex-col items-center text-center'>
          <div className='w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-3xl font-bold text-on-surface'>
            {initials}
          </div>
          <h2 className='text-xl font-semibold mt-4'>{user.firstName || 'Пользователь'}</h2>
          <p className='text-sm text-on-surface-variant'>{user.email}</p>
          <span className='mt-2 inline-block bg-surface-container px-3 py-1 rounded-full text-sm'>
            {user.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
          </span>
          <p className='text-xs text-on-surface-variant mt-4'>
            Регистрация: {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>

        {/* Статистика */}
        <div className='md:col-span-2 grid grid-cols-2 gap-4'>
          <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6'>
            <p className='text-3xl font-bold'>{totalOrders}</p>
            <p className='text-sm text-on-surface-variant'>Всего заказов</p>
          </div>
          <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6'>
            <p className='text-3xl font-bold'>{publishedCount}</p>
            <p className='text-sm text-on-surface-variant'>Опубликовано</p>
          </div>
        </div>
      </div>
    </div>
  )
}
