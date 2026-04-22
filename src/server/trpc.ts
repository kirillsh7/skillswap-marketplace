import { initTRPC, TRPCError } from '@trpc/server'
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Meta {
  span: string
}

export interface Context {
  session: Awaited<ReturnType<typeof getServerSession>>
}

export const t = initTRPC.context<Context>().meta<Meta>().create()

//------------------------------------------------------------
export const createContext = async (): Promise<Context> => {
  // В Server Actions доступ к заголовкам через next/headers
  const headersList = headers()
  // Эмулируем объект req/res для getServerSession
  const req = {
    headers: Object.fromEntries(headersList.entries()),
  } as any
  const res = {} as any

  const session = await getServerSession(req, res, authOptions)
  return { session }
}
//-------------------------------------------------------------

export const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as any)?.span ?? '',
    }),
  )
  .use(async opts => {
    const ctx = await createContext()
    return opts.next({ ctx })
  })

export const protectedAction = serverActionProcedure.use(opts => {
  if (!opts.ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
      session: opts.ctx.session, // ensures type is non-nullable
    },
  })
})
