// import { NextRequest, NextResponse } from 'next/server';

// import middleware from 'next-auth/middleware';
// export default middleware;

// this is he same as the above as 'next-auth/middleware' returns 'middleware' as default
// export { default } from 'next-auth/middleware';

// dev 0 trial
// export function middleware(request: NextRequest) {
//   console.log('Middleware is running for path:', request.nextUrl.pathname);
//   return NextResponse.redirect(new URL('/newpage', request.nextUrl.origin));
// }

// --- excludes api routes from being auth which lead infinite loop of redirectoin to signin
// export const config = {
//   // The 'matcher' array specifies which paths the middleware should apply to.
//   // Paths NOT listed here will bypass the middleware entirely.
//   matcher: [
//     '/student/:path*', // Protects /student and any sub-paths (e.g., /student/dashboard, /student/profile)
//     '/admin/:path*', // Protects /admin and any sub-paths (e.g., /admin/users, /admin/settings)
//     '/instructor/:path*', // Protects /instructor and any sub-paths (e.g., /instructor/courses, /instructor/students)
//   ],
// };

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.SECRET });

  if (!token) return NextResponse.redirect(new URL('/home', request.url));

  // Check the role and redirect based on the role
  switch (token.role) {
    case 'admin':
      if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      break;
    case 'student':
      if (!request.nextUrl.pathname.startsWith('/student')) {
        return NextResponse.redirect(new URL('/student', request.url));
      }
      break;
    case 'instructor':
      // Add the paths that the nurse can access here
      if (!request.nextUrl.pathname.startsWith('/instructor')) {
        return NextResponse.redirect(new URL('/instructor', request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login, /home and api and the static folder
    '/((?!api|_next/static|_next/image|favicon.ico|login|home|register).*)',
  ],
};
