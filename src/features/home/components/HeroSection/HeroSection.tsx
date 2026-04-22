import { ASSETS } from '@/shared'
import { SearchBar } from './SearchBar'
import Image from 'next/image'

export const HeroSection = () => {
  return (
    <section className='relative pt-24 pb-32 px-6 lg:px-12 flex flex-col items-center justify-center text-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          alt='Hero Background'
          className='w-full h-full object-cover opacity-20 mix-blend-multiply'
          src={ASSETS.background.heroSection}
          width={1920}
          height={1080}
        />
      </div>
      <div className='relative z-10 max-w-4xl mx-auto space-y-4'>
        <h1 className='text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tight leading-[1.15]'>
          Платите только за результат. <br />
          <span className='text-primary'>Мы замораживаем деньги, а не ваши нервы.</span>
        </h1>
        <p className='text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto'>
          Торговая площадка премиум-класса для квалифицированных специалистов. Гарантированное
          безопасное депонирование.
        </p>

        <SearchBar />
      </div>
    </section>
  )
}
