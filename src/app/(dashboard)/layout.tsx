import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Footer, Header, ROUTES } from '@/shared'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(ROUTES.LOGIN)
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 px-10 py-24'>{children}</main>
      <Footer />
    </div>
  )
}
