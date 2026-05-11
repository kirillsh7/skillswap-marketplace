import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './shared'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
