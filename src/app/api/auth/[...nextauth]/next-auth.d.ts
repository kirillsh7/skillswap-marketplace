import NextAuth from 'next-auth'
import { User as DbUser } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
  }
  interface Session {
    user: DbUser
  }
}
