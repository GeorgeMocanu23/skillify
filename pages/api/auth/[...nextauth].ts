import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "your username",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(process.env.SITE_URL + "/api/user/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })

          const userResponse = await res.json()

          if (res.status === 200) {
            if (userResponse.user) {
              const user = JSON.parse(userResponse.user)
              return Promise.resolve(user)
            } else {
              console.error('Username is undefined in the response')
            }
          } else {
            console.error('Login failed:', userResponse.error)
          }

          return Promise.resolve(null)

        } catch (error) {
          console.error('An error occurred during login:', error)
          return Promise.resolve(null)
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    newUser: '/register',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user
        }
      }
      return token
    },

    async session({ session, token, user }) {
      session.user.id = token.id
      session.user.name = token.username
      return {
        ...session,
        ...token,
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})