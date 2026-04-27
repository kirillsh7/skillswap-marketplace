export const LeftColumn = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-8 order-2 lg:order-1'>
      <div>
        <h1 className='text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight mb-4'>
          Присоединяйтесь к Импульс Рынка
        </h1>
        <p className='text-lg text-on-surface-variant font-body'>
          Создайте аккаунт и начните безопасный обмен услугами. Ваши сделки защищены гарантией Safe
          Deal.
        </p>
      </div>

      {children}
    </div>
  )
}
