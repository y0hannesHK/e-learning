// types/next-auth.d.ts
import { ROLE } from '@/app/generated/prisma';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string; // Already exists, but good to be explicit
      email: string; // Already exists
      name?: string | null; // Already exists, often combined first+last
      firstName?: string | null; // <-- Add this
      lastName?: string | null; // <-- Add this
      role?: ROLE; // <-- Add if you have a role
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object that is returned from the `authorize` callback.
   * Minimal required fields are 'id' and 'email'.
   */
  interface User {
    id: string;
    email: string;
    name?: string | null;
    firstName?: string | null; // <-- Add this
    lastName?: string | null; // <-- Add this
    role?: ROLE;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    firstName?: string | null; // <-- Add this
    lastName?: string | null; // <-- Add this
    role?: ROLE;
  }
}
