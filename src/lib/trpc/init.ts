import { initTRPC } from '@trpc/server'
import { getServerSession } from 'next-auth'
import superjson from 'superjson'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerSession(opts.req, opts.res, authOptions)
  return { session, ...opts }
}

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
