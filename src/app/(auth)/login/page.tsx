import { LoginPage } from '@/features'
import { Metadata } from 'next'
import { SITE_NAME } from '@/shared'

export const metadata: Metadata = {
  title: `${SITE_NAME} - Авторизация `,
}

export default function Login() {
  return <LoginPage />
}
