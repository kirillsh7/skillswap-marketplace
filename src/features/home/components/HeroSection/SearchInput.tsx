interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
  isShowDivider?: boolean
}

export const SearchInput = ({ icon, isShowDivider, ...props }: SearchInputProps) => {
  return (
    <>
      <div className='flex-1 w-full md:w-auto relative group'>
        <div className='absolute inset-y-0 left-4 flex items-center pointer-events-none'>
          {icon}
        </div>
        <input
          className='w-full bg-transparent border-0 py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-0 focus:outline-none rounded-full'
          {...props}
          type='text'
        />
      </div>
      {isShowDivider && <div className='hidden md:block w-px h-8 bg-surface-container-high mx-2' />}
    </>
  )
}
