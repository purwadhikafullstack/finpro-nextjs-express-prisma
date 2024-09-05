import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

export function instance(): AxiosInstance {
  const token = getCookie('access-token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers,
    withCredentials: true,
  });
}

export default instance;
