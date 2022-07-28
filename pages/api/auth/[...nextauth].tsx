import GoogleProvider from 'next-auth/providers/google'
import NextAuth from 'next-auth/next'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
  ],

  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET!,
  },

  secret: process.env.NEXT_PUBLIC_JWT_SECRET!,

  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
