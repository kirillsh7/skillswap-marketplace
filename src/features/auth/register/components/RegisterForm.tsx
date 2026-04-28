import { RoleSelector } from '../_components'

export const RegisterForm = () => {
  return (
    <form className='space-y-6 bg-surface-container-lowest p-8 rounded-xl shadow-[0_10px_40px_-10px_rgba(7,30,39,0.06)]'>
      <RoleSelector />

      <div className='space-y-4'>
        <div>
          <label
            className='block text-sm font-medium text-on-surface-variant mb-1 font-label'
            htmlFor='fullName'
          >
            Полное имя
          </label>
          <input
            className='w-full rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-surface-tint focus:ring-opacity-30 text-on-surface font-body p-3 placeholder:text-outline-variant transition-shadow'
            id='fullName'
            name='fullName'
            placeholder='Иван Петров'
            type='text'
          />
        </div>
        <div>
          <label
            className='block text-sm font-medium text-on-surface-variant mb-1 font-label'
            htmlFor='email'
          >
            Эл. почта
          </label>
          <input
            className='w-full rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-surface-tint focus:ring-opacity-30 text-on-surface font-body p-3 placeholder:text-outline-variant transition-shadow'
            id='email'
            name='email'
            placeholder='ivan@example.com'
            type='email'
          />
        </div>
        <div>
          <label
            className='block text-sm font-medium text-on-surface-variant mb-1 font-label'
            htmlFor='password'
          >
            Пароль
          </label>
          <input
            className='w-full rounded-lg bg-surface-container-highest border-none focus:ring-2 focus:ring-surface-tint focus:ring-opacity-30 text-on-surface font-body p-3 placeholder:text-outline-variant transition-shadow'
            id='password'
            name='password'
            placeholder='••••••••'
            type='password'
          />
        </div>
      </div>

      <div className='pt-4'>
        <button
          className='w-full rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold py-3 px-6 hover:bg-opacity-90 transition-all shadow-[0_4px_14px_0_rgba(0,61,155,0.39)] hover:shadow-[0_6px_20px_rgba(0,61,155,0.23)] active:scale-98 font-label'
          type='button'
        >
          Создать аккаунт
        </button>
        <p className='text-center text-sm text-on-surface-variant mt-4 font-body'>
          Уже есть аккаунт?{' '}
          <Link
            className='text-primary font-semibold hover:underline'
            href='/login'
          >
            Войти
          </Link>
        </p>
      </div>
    </form>
  )
}
