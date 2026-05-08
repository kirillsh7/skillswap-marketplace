import { RegisterPage } from '@/features'
import { Metadata } from 'next'
import { SITE_NAME } from '@/shared'

export const metadata: Metadata = {
  title: `${SITE_NAME} Регистрация `,
}
export default function Register() {
  return <RegisterPage />
}
