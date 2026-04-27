import { RegisterPage } from '@/features'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Импульс рынка - Регистрация ',
}
export default function Register() {
  return <RegisterPage />
}
