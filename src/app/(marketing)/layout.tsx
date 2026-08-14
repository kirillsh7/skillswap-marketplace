import { Footer, Header } from '@/shared'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 bg-surface text-on-surface '>{children}</main>
      <Footer />
    </div>
  )
}
