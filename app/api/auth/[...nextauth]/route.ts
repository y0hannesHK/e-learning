import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@mail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );
        // pass only usable data
        return isPasswordCorrect ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // The `jwt` callback is called whenever a JSON Web Token is created or updated.
    // It receives the `user` object returned from `authorize`.
    async jwt({ token, user }) {
      if (user) {
        // `user` is only defined on the first sign-in
        token.id = user.id;
        token.email = user.email; // Often email is included by default, but explicitly safer
        /**
         * firstName and lastName are combined to name
         * if - singed with google name takes name form google account
         * else - name takes firstName + lastName
         */
        token.name =
          user.name ||
          (user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : null);

        token.firstName =
          user.firstName || (user.name ? user.name.split(' ')[0] : null);
        token.lastName =
          user.lastName ||
          (user.name ? user.name.split(' ').slice(1).join(' ') : null);

        token.role = user.role; // And any other custom fields like role
      }
      return token;
    },

    // The `session` callback is called whenever a session is checked.
    // It receives the `token` from the `jwt` callback.
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.email = token.email;

        // --- Assign directly from token, as token now has consistent properties ---
        session.user.name = token.name;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.role = token.role;
      }
      return session;
    },
    // async redirect(params: { url: string }) {
    //   const { url } = params;

    //   // url is just a path, e.g.: /videos/pets
    //   if (!url.startsWith('http')) return url;

    //   // If we have a callback use only its relative path
    //   const callbackUrl = new URL(url).searchParams.get('callbackUrl');
    //   if (!callbackUrl) return url;

    //   return new URL(callbackUrl as string).pathname;
    // },
    async signIn({ user, account, profile, email, credentials }) {
      // `user` here is the object returned by the `authorize` function (for credentials)
      // or the normalized user object from OAuth provider (like Google)
      const userRole = user?.role; // Access the role from the user object
      console.log(credentials);

      // switch (userRole) {
      //   case 'student':
      //     return '/student';
      //   case 'instructor':
      //     return '/instructor';
      //   case 'admin':
      //     return '/admin';
      //   default:
      //     return 'dashboard';
      // }
      return true;
    },
  },
  pages: {
    signIn: '/login', // custom sigin page
    // error: '/auth/error', // dev - waitning
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
