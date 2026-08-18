import { prisma } from '@/lib/prisma/prisma'
import Link from 'next/link'
import { ROUTES } from '@/shared/constants/routes'

export default async function servicesPage() {
  const services = await prisma.services.findMany({
    where: { published: true },
    include: {
      author: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6'>Услуги</h1>
      {services.length === 0 ? (
        <p className='text-on-surface-variant'>Пока нет услуг.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map(service => (
            <Link
              href={`${ROUTES.SERVICES}/${service.id}`}
              key={service.id}
              className='bg-surface-container-lowest rounded-xl p-6 shadow hover:shadow-lg transition-shadow block'
            >
              <h2 className='text-xl font-semibold mb-2'>{service.title}</h2>
              <p className='text-sm text-on-surface-variant mb-4 line-clamp-3'>
                {service.description || 'Без описания'}
              </p>
              <div className='flex items-center justify-between text-sm'>
                <span className='text-on-surface-variant'>
                  {service.author.firstName || service.author.email}
                </span>
                <span className='text-primary'>{service.categories}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
