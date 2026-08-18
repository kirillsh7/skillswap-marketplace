'use server'

import { prisma } from '@/lib/prisma/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

export async function updateProfileAction(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { success: false, error: 'Неавторизован' }

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!firstName.trim() || !lastName.trim()) {
    return { success: false, error: 'Имя и фамилия обязательны' }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { firstName: firstName.trim(), lastName: lastName.trim() },
  })

  revalidatePath('/profile')
  return { success: true }
}

export async function changePasswordAction(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return { success: false, error: 'Неавторизован' }

  const currentPassword = formData.get('currentPassword') as string
  const newPassword = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
    return { success: false, error: 'Пароли не совпадают или поля пустые' }
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return { success: false, error: 'Пользователь не найден' }

  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) return { success: false, error: 'Текущий пароль неверен' }

  const hashed = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  })

  return { success: true }
}
