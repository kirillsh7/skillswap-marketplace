import { Wallet, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'

export default function WalletPage() {
  return (
    <div className='container mx-auto py-8 space-y-6'>
      <h1 className='text-3xl font-bold'>Кошелёк</h1>

      {/* Баланс */}
      <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6'>
        <div className='flex items-center gap-2 mb-2'>
          <Wallet className='w-6 h-6 text-on-surface-variant' />
          <h2 className='text-xl font-semibold'>Баланс</h2>
        </div>
        <p className='text-4xl font-extrabold'>0,00 ₽</p>
        <p className='text-sm text-on-surface-variant mt-1'>
          Ваш текущий баланс для безопасных сделок
        </p>
        <div className='flex gap-4 mt-6'>
          <button className='flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary font-medium hover:opacity-90 transition-opacity'>
            <ArrowDownToLine className='w-4 h-4' />
            Пополнить
          </button>
          <button className='flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container text-on-surface-variant font-medium hover:bg-surface-container-highest transition-colors'>
            <ArrowUpFromLine className='w-4 h-4' />
            Вывести
          </button>
        </div>
      </div>

      {/* История */}
      <div className='bg-surface-container-lowest rounded-2xl shadow-ambient p-6'>
        <h2 className='text-xl font-semibold mb-4'>История операций</h2>
        <p className='text-on-surface-variant'>Пока нет транзакций.</p>
      </div>
    </div>
  )
}
