import { prisma } from '@/lib/prisma/prisma'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants/routes'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    where: { published: true },
    include: {
      author: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6'>Услуги</h1>
      {orders.length === 0 ? (
        <p className='text-on-surface-variant'>Пока нет услуг.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orders.map(order => (
            <Link
              href={`${ROUTES.ORDERS}/${order.id}`}
              key={order.id}
              className='bg-surface-container-lowest rounded-xl p-6 shadow hover:shadow-lg transition-shadow block'
            >
              <h2 className='text-xl font-semibold mb-2'>{order.title}</h2>
              <p className='text-sm text-on-surface-variant mb-4 line-clamp-3'>
                {order.description || 'Без описания'}
              </p>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-on-surface-variant'>
                  {order.author.firstName || order.author.email}
                </span>
                <span className='text-primary'>{order.categories}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
