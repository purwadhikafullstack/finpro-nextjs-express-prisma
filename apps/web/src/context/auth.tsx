'use client';

import * as React from 'react';

import { User } from '@/types/user';
import axios from '@/lib/axios';
import { useLocalStorage } from 'usehooks-ts';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  user: User | null;
  token: string | null;
  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { email: string; fullname: string; phone: string }) => Promise<void>;
  verify: (data: { password: string; confirmation: string; token: string }) => Promise<void>;
  update: (data: { fullname: string; phone: string }) => Promise<void>;
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
  google: async () => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [token, setToken] = useLocalStorage<string | null>('access_token', null);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const profile = async () => {
      const { data } = await axios.get('/profile');
      setUser(data.data);
    };

    if (token) profile();
  }, [token, toast, setToken]);

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

  const update = async ({ fullname, phone }: { fullname: string; phone: string }) => {
    const { data } = await axios.put('/profile', { fullname, phone });
    setUser(data.data);
  };

  const signout = async () => {
    await axios.post('/auth/logout');
    setToken(null);
    setUser(null);
  };

  const google = async () => {
    await axios.get('/auth/google');
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signup, verify, update, google, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
