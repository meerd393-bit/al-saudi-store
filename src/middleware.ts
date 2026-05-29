import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for our simple auth cookie
    const authCookie = request.cookies.get('admin_token');

    // If no cookie or wrong value, redirect to login
    if (!authCookie || authCookie.value !== 'alsaudi_secure_2026') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
