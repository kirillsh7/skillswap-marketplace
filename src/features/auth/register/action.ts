import { prisma } from '@/lib/prisma/prisma'
import { RegisterSchema, type RegisterFormData } from './schemas'
import bcrypt from 'bcryptjs'
import { signIn } from 'next-auth/react'

export async function registerAction(data: RegisterFormData) {
  const validated = RegisterSchema.safeParse(data)

  if (!validated.success) {
    error: validated.error.flatten().fieldErrors
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (existingUser) {
    return { error: 'Пользователь с таким email уже существует' }
  }
  const cashedPassword = bcrypt.hashSync(data.password, 10)

  await prisma.user.create({
    data: {
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      password: cashedPassword,
    },
  })

  await signIn('credentials', {
    email: data.email,
    password: data.password, // пароль ещё в открытом виде в data
    redirect: false,
  })

  return { success: true }
}
