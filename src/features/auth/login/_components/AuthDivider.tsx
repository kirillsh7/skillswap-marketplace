export const AuthDivider = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center gap-4 mb-8'>
      <div className='h-[1px] flex-1 bg-surface-container-low'></div>
      <span className='font-label text-xs text-on-surface-variant uppercase tracking-widest'>
        {text}
      </span>
      <div className='h-[1px] flex-1 bg-surface-container-low'></div>
    </div>
  )
}
