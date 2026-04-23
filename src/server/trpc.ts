import { initTRPC, TRPCError } from '@trpc/server'
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir'
import { currentUser } from './auth'

interface Meta {
  span: string
}
export const t = initTRPC.meta<Meta>().create()
export const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta)?.span ?? '',
    }),
  )
  .use(async opts => {
    const user = await currentUser()
    return opts.next({ ctx: { user } })
  })

export const protectedAction = serverActionProcedure.use(opts => {
  if (!opts.ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user,
    },
  })
})
