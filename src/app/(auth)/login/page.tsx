import { LoginPage } from '@/features'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Импульс рынка - Авторизация ',
}
export default function Login() {
  return <LoginPage />
}
