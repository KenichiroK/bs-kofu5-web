import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const GONE_PATTERNS = [
  /^\/\d{4}\/\d{2}\/\d{2}\/.+/,
  /^\/tags(\/.*)?$/,
  /^\/\d+\/?$/,
]

const GONE_BODY =
  '<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><title>410 Gone</title><meta name="robots" content="noindex"></head><body><h1>410 Gone</h1><p>このページは削除されました。</p></body></html>'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (GONE_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
}
