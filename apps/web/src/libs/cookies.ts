import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export function getAuthCookie(key: string) {
  const cookie = getCookie(key);
  if (!cookie) {
    return undefined;
  }

  return Buffer.from(cookie, 'base64').toString('ascii');
}

export function setAuthCookie(key: string, value: string) {
  const toBase64 = Buffer.from(value).toString('base64');
  setCookie(key, toBase64, { maxAge: 24 * 60 * 60, path: '/' });
}

export function getValidAuthToken() {
  try {
    const token = getAuthCookie('auth-token');
    const data = JSON.parse(String(token));

    return { data };
  } catch (err) {
    deleteCookie('auth-token');
    return { data: undefined };
  }
}
