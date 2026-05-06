import { authOptions } from '@/lib/auth'
import { initTRPC, TRPCError } from '@trpc/server'
import { getServerSession } from 'next-auth'
import superjson from 'superjson'
import { prisma } from '../prisma/prisma'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerSession(authOptions)
  return { session, headers: opts.headers, prisma }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure

export const protectedProcedure = t.procedure.use(async opts => {
  if (!opts.ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      session: opts.ctx.session,
    },
  })
})
