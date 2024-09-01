import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

export function instance(): AxiosInstance {
  const token = getCookie('access-token') || '';
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}

export default instance;
