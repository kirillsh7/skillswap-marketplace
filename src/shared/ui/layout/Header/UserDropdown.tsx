import { LogOut, User } from 'lucide-react'

interface UserDropdownProps {
  onLogout: () => void
  onProfileClick: () => void
}

export const UserDropdown = ({ onLogout, onProfileClick }: UserDropdownProps) => (
  <div className='absolute right-5 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50'>
    <button
      onClick={onProfileClick}
      className='w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700'
    >
      <User size={16} /> Профиль
    </button>
    <button
      onClick={onLogout}
      className='w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 text-red-600'
    >
      <LogOut size={16} /> Выйти
    </button>
  </div>
)
