// import { prisma } from '@/lib/prisma/prisma'
// import { RegisterSchema, type RegisterFormData } from './schemas'
// import bcrypt from 'bcryptjs'
// import { signIn } from 'next-auth/react'

// export async function registerAction(data: RegisterFormData) {
//   const validated = RegisterSchema.safeParse(data)

//   if (!validated.success) {
//     error: validated.error.flatten().fieldErrors
//   }

//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email: data.email,
//     },
//   })

//   if (existingUser) {
//     return { error: 'Пользователь с таким email уже существует' }
//   }
//   const cashedPassword = bcrypt.hashSync(data.password, 10)

//   await prisma.user.create({
//     data: {
//       // role: data.role,
//       // fullName: data.fullName,
//       email: data.email,
//       password: cashedPassword,
//     },
//   })

//   await signIn('credentials', {
//     email: data.email,
//     password: data.password, // пароль ещё в открытом виде в data
//     redirect: false,
//   })

//   return { success: true }
// }
'use server'

import { prisma } from '@/lib/prisma/prisma' // ТОЛЬКО серверный импорт
import { RegisterSchema, type RegisterFormData } from './schemas'
import bcrypt from 'bcryptjs'

export async function registerAction(data: RegisterFormData) {
  // 1. Валидация
  const validated = RegisterSchema.safeParse(data)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const { email, password } = validated.data

  // 2. Проверка существования
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { error: { email: ['Пользователь с таким email уже существует'] } }
  }

  // 3. Хэш пароля (асинхронно, чтобы не блокировать)
  const hashedPassword = await bcrypt.hash(password, 10)

  // 4. Создание пользователя
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return { success: true }
}
