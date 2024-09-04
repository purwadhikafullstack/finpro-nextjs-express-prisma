import { setCookie } from 'cookies-next';

// Fungsi untuk refresh token
export const refreshToken = async () => {
  try {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      credentials: 'include', // agar refresh-token terkirim
    });
    const data = await response.json();
    if (data.accessToken) {
      setCookie('access-token', data.accessToken); // Simpan access-token yang baru
      return data.accessToken;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
  return null;
};
