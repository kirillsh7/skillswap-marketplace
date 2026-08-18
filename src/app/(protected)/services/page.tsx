// import { prisma } from '@/lib/prisma/prisma'
// import Link from 'next/link'
// import { ROUTES } from '@/shared/constants/routes'

// export default async function servicesPage() {
//   const services = await prisma.services.findMany({
//     where: { published: true },
//     include: {
//       author: { select: { id: true, firstName: true, lastName: true, email: true } },
//     },
//     orderBy: { createdAt: 'desc' },
//   })

//   return (
//     <div className='container mx-auto py-8'>
//       <h1 className='text-3xl font-bold mb-6'>Услуги</h1>
//       {services.length === 0 ? (
//         <p className='text-on-surface-variant'>Пока нет услуг.</p>
//       ) : (
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {services.map(service => (
//             <Link
//               href={`${ROUTES.SERVICES}/${service.id}`}
//               key={service.id}
//               className='bg-surface-container-lowest rounded-xl p-6 shadow hover:shadow-lg transition-shadow block'
//             >
//               <h2 className='text-xl font-semibold mb-2'>{service.title}</h2>
//               <p className='text-sm text-on-surface-variant mb-4 line-clamp-3'>
//                 {service.description || 'Без описания'}
//               </p>
//               <div className='flex items-center justify-between text-sm'>
//                 <span className='text-on-surface-variant'>
//                   {service.author.firstName || service.author.email}
//                 </span>
//                 <span className='text-primary'>{service.categories}</span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
import { prisma } from '@/lib/prisma/prisma'
import { ServicesListItem, ServicesFilter } from '@/features'

import { ROUTES } from '@/shared'

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
    subcategory?: string
    query?: string
    published?: string
  }>
}) {
  const params = await searchParams

  const where: any = {}
  if (params.category) where.categories = params.category
  if (params.subcategory) where.subcategories = params.subcategory
  if (params.query) {
    where.OR = [{ title: { contains: params.query } }, { description: { contains: params.query } }]
  }
  if (params.published === '1') where.published = true

  const services = await prisma.services.findMany({
    where,
    include: {
      author: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Функция для получения цены из пакетов
  const getPrice = (service: any): string => {
    const packages = (service.packages as any[]) || []
    if (packages.length === 0) return 'по договоренности'
    const firstPrice = packages[0]?.price
    if (!firstPrice) return 'по договоренности'
    return `${firstPrice} ₽`
  }

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className='container mx-auto py-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
      <aside className='lg:col-span-1'>
        <ServicesFilter />
      </aside>
      <section className='lg:col-span-3'>
        <h1 className='text-2xl font-bold mb-6'>Услуги</h1>
        {services.length === 0 ? (
          <p className='text-on-surface-variant'>Ничего не найдено.</p>
        ) : (
          <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6'>
            <div className='divide-y divide-surface-container'>
              {services.map(service => (
                <ServicesListItem
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  categories={service.categories}
                  subcategories={service.subcategories}
                  price={getPrice(service)}
                  authorName={service.author.firstName || service.author.email}
                  published={service.published}
                  createdAt={formatDate(service.createdAt)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
