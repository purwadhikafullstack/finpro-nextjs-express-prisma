'use client';

import * as React from 'react';

import { User, UserToken } from '@/types/user';

import axios from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from 'usehooks-ts';

interface AccessTokenPayload extends UserToken {
  exp: number;
  iat: number;
}

interface AuthContextProps {
  user: UserToken | null;
  token: string | null;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; fullname: string; phone: string }) => Promise<void>;
  verify: (data: { password: string; confirmation: string; token: string }) => Promise<void>;
  update: (data: { fullname: string; phone: string; avatar_url: string }) => Promise<void>;
  changePassword: (data: { password: string; new_password: string; confirmation: string }) => Promise<void>;
  changeEmail: (data: { email: string; password: string }) => Promise<void>;
  google: () => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  token: null,
  signin: async () => {},
  signup: async () => {},
  verify: async () => {},
  update: async () => {},
  changePassword: async () => {},
  changeEmail: async () => {},
  google: async () => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage<string | null>('access_token', null);
  const [user, setUser] = React.useState<UserToken | null>(null);

  React.useEffect(() => {
    const parseToken = (token: string) => {
      const { exp, iat, ...user } = jwtDecode<AccessTokenPayload>(token);
      setUser(user);
    };

    if (token) parseToken(token);
    else setUser(null);
  }, [token]);

  const signin = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post('/auth/login', { email, password });
    setToken(data.data.access_token);
  };

  const signup = async ({ email, fullname, phone }: { email: string; fullname: string; phone: string }) => {
    await axios.post('/auth/register', { email, fullname, phone });
  };

  const verify = async ({
    password,
    confirmation,
    token,
  }: {
    password: string;
    confirmation: string;
    token: string;
  }) => {
    const { data } = await axios.post('/auth/set-password', { password, confirmation, token });
    setToken(data.data.access_token);
  };

  const update = async ({ fullname, phone, avatar_url }: { fullname: string; phone: string; avatar_url: string }) => {
    const { data } = await axios.put('/profile', { fullname, phone, avatar_url });
    setToken(data.data.access_token);
  };

  const changePassword = async ({
    password,
    new_password,
    confirmation,
  }: {
    password: string;
    new_password: string;
    confirmation: string;
  }) => {
    await axios.post('/profile/change-password', { password, new_password, confirmation });
  };

  const changeEmail = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post('/profile/change-email', { email, password });
    setToken(data.data.access_token);
  };

  const signout = async () => {
    await axios.post('/auth/logout');
    setToken(null);
  };

  const google = async () => {
    await axios.get('/auth/google');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signin,
        signup,
        verify,
        update,
        changePassword,
        changeEmail,
        google,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
