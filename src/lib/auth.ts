import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma/prisma'
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

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email
      }
      return session
    },
  },
}
