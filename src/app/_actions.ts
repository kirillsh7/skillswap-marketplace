'use server'

import { z } from 'zod'
import { protectedAction } from '../server/trpc'

export const createPost = protectedAction
  .input(
    z.object({
      title: z.string(),
    }),
  )
  .mutation(async opts => {
    // opts.ctx.user is typed as non-nullable
    // opts.input is typed as { title: string }
    // Create the post...
  })
