import { createTRPCRouter, protectedProcedure, baseProcedure } from '../init'
import { z } from 'zod'
import { prisma } from '@/lib/prisma/prisma'
import bcrypt from 'bcryptjs'

export const authRouter = createTRPCRouter({
  // Публичная процедура – регистрация
  register: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        role: z.enum(['CLIENT', 'PROVIDER']),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existing = await ctx.prisma.user.findUnique({ where: { email: input.email } })
      if (existing) throw new Error('Email уже занят')
      const hashed = await bcrypt.hash(input.password, 10)
      await ctx.prisma.user.create({
        data: { ...input, password: hashed },
      })
      return { success: true }
    }),

  // Приватная процедура – получение профиля
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    })
    return user
  }),
})
