import { prisma } from '@/lib/prisma/prisma'
import { notFound } from 'next/navigation'

export default async function ServicesDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const services = await prisma.services.findUnique({
    where: { id },
    include: { author: true },
  })

  if (!services) {
    notFound()
  }

  // JSON-поля уже распарсены Prisma в массивы/объекты
  const tags = (services.tags as string[]) ?? []
  const packages = (services.packages as any[]) ?? []
  const faq = (services.faq as any[]) ?? []
  const images = (services.images as string[]) ?? []

  return (
    <div className='container mx-auto py-8 max-w-4xl'>
      <div className='bg-surface-container-lowest rounded-2xl p-8 shadow-ambient'>
        <h1 className='text-3xl font-bold mb-4'>{services.title}</h1>
        <p className='text-lg text-on-surface-variant mb-6'>{services.description}</p>

        {images.length > 0 && (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-8'>
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Image ${idx + 1}`}
                className='rounded-xl object-cover w-full h-48'
              />
            ))}
          </div>
        )}

        <div className='grid md:grid-cols-2 gap-6 mb-8'>
          <div>
            <h3 className='font-semibold mb-2'>Категория</h3>
            <p className='text-on-surface-variant'>
              {services.categories} / {services.subcategories}
            </p>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Автор</h3>
            <p>{services.author.firstName || services.author.email}</p>
          </div>
        </div>

        {tags.length > 0 && (
          <div className='mb-8'>
            <h3 className='font-semibold mb-2'>Теги</h3>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className='bg-surface-container-low px-3 py-1 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {packages.length > 0 && (
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4'>Пакеты</h3>
            <div className='space-y-4'>
              {packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className='bg-surface-container-low p-4 rounded-xl'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <h4 className='font-medium'>{pkg.name}</h4>
                    <span className='font-bold text-primary'>{pkg.price} ₽</span>
                  </div>
                  <p className='text-sm text-on-surface-variant mb-2'>{pkg.description}</p>
                  <div className='text-sm'>
                    <p>Срок: {pkg.delivery} дней</p>
                    <p>Правки: {pkg.revisions}</p>
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className='list-disc list-inside mt-2'>
                        {pkg.features.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {faq.length > 0 && (
          <div>
            <h3 className='text-xl font-semibold mb-4'>FAQ</h3>
            <div className='space-y-4'>
              {faq.map((item, idx) => (
                <div key={idx}>
                  <p className='font-medium'>{item.question}</p>
                  <p className='text-on-surface-variant'>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
