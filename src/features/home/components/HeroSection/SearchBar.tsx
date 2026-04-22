import { ActionButton } from '@/shared'
import { Calendar, MapPin, Search } from 'lucide-react'
import { SearchInput } from './SearchInput'

export const SearchBar = () => {
  return (
    <div className='mt-12 bg-surface-container-lowest rounded-full shadow-[0_20px_40px_-15px_rgba(7,30,39,0.1)] p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border-4 border-surface-container'>
      <SearchInput
        icon={<Search />}
        isShowDivider
        placeholder='Какая услуга?'
      />
      <SearchInput
        icon={<MapPin />}
        isShowDivider
        placeholder='Где?'
      />
      <SearchInput
        icon={<Calendar />}
        placeholder='Когда?'
      />
      <ActionButton>Найти</ActionButton>
    </div>
  )
}
