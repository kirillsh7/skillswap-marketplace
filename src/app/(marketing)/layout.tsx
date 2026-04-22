import { Footer, Header } from '@/shared'
import '@/app/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='flex-grow'>
        <div className='bg-surface text-on-surface min-h-screen flex flex-col pt-16'>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
