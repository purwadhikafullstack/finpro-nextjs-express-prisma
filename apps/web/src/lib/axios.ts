import base, { AxiosRequestConfig } from 'axios';

import { BACKEND_URL } from '@/lib/constant';

const axios = base.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem('access_token');
    if (token) config.headers['Authorization'] = 'Bearer ' + token.slice(1, token.length - 1);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const intercept = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
      }

      axios.interceptors.response.eject(interceptor);

      return axios
        .post('/auth/refresh')
        .then(({ data }) => {
          const token = data.data.access_token;
          window.localStorage.setItem('access_token', JSON.stringify(token));
          error.response.config.headers['Authorization'] = 'Bearer ' + JSON.stringify(token);
          return axios(error.response.config);
        })
        .catch((err) => {
          window.localStorage.removeItem('access_token');
          return Promise.reject((err.response && err.response.data) || 'Wrong Services');
        })
        .finally(intercept);
    }
  );
};

intercept();

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axios.get(url, { ...config });
  return res.data;
};

export const fetcherPost = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axios.post(url, { ...config });
  return res.data;
};

export default axios;
