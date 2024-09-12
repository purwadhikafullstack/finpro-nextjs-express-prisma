import * as jose from 'jose';

import type { NextRequest } from 'next/server';

const options = {
  secret: new TextEncoder().encode(process.env.NEXT_PRIVATE_JWT_SECRET),
};

export function middleware(request: NextRequest) {
  // const refresh = request.cookies.get('refresh_token');
  // if (refresh) {
  //   try {
  //     const value = refresh.value;
  //     const decoded = jose.jwtVerify(value, options.secret);
  //     console.log(value, decoded);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};
