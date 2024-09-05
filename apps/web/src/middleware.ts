import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AxiosError } from 'axios';
import parseJWT from 'utils/parseJwt';
import instance from 'utils/axiosIntance';

// Cek apakah token sudah akan expired dalam 'X' waktu
const expiryChecker = async (token: string) => {
  if (!token) return true;

  const decoded = await decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  return Date.now() >= decoded.exp * 1000 - 15 * 60 * 1000; // 15 menit
};

const decodeToken = async (token: string) => {
  try {
    const decodedToken = parseJWT(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const ACCESS_TOKEN = request.cookies.get('access-token')?.value || '';
  const REFRESH_TOKEN = request.cookies.get('refresh-token')?.value || '';
  const response = NextResponse.next();

  //  Kalau token ga ada, langsung di lempar ke home dan cookies di delete
  if (!REFRESH_TOKEN || !ACCESS_TOKEN) {
    response.cookies.delete('access-token');
    response.cookies.delete('refresh-token');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Kalau ada refresh-token, maka akan di cek apakah access-token akan expired? jika iya generate access-token yang baru dengan refresh-token
  if (REFRESH_TOKEN) {
    const isTokenExpired = await expiryChecker(ACCESS_TOKEN);

    if (isTokenExpired) {
      try {
        const { data } = await instance().post(
          'http://localhost:8000/api/auth/refresh',
          {},
          {
            headers: {
              Cookie: `refresh-token=${REFRESH_TOKEN}`,
            },
            withCredentials: true,
          },
        );

        response.cookies.set('access-token', data.result.accessToken);
      } catch (error) {
        console.error('Error occurred during refresh:', error);
        if (error instanceof AxiosError) console.log(error.response?.data);
      }
    }
  }
  return response;
}

// middleware akan jalan untuk semua rute dibawah
export const config = {
  matcher: [
    '/profile/:path*',
    '/dashboard/:path*',
    '/order-details/:path*',
    '/pickup-request:path*',
  ],
};
