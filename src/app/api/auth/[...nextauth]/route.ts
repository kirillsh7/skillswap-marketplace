import { prisma } from '@/lib/prisma/prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        if (!credentials) return null

        const user = await prisma.user.findUnique({ where: { email: credentials.email } })

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    // 1. JWT callback — добавляет данные в токен при входе
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    // 2. Session callback — копирует данные из токена в сессию
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number
        session.user.email = token.email as string
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
