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
  authenticate: (data: { password: string; token: string }) => Promise<void>;
  update: (data: { fullname: string; phone: string }) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  token: null,
  signin: async () => {},
  signup: async () => {},
  authenticate: async () => {},
  update: async () => {},
  signout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [token, setToken] = useLocalStorage<string | null>('access_token', null);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const { data } = await axios.get('/profile');
          setUser(data.data);
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to get user profile',
            description: error.message,
          });
        }
      };

      getUser();
    } else {
      const refresh = async () => {
        try {
          const { data } = await axios.post('/auth/refresh');
          setToken(data.data.access_token);
        } catch (error: any) {
          console.log('unauthenticated');
        }
      };

      refresh();
    }
  }, [token, toast, setToken]);

  const signin = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axios.post('/auth/login', { email, password });
    setToken(data.data.access_token);
  };

  const signup = async ({ email, fullname, phone }: { email: string; fullname: string; phone: string }) => {
    await axios.post('/auth/register', { email, fullname, phone });
  };

  const authenticate = async ({ password, token }: { password: string; token: string }) => {
    const { data } = await axios.post('/auth/set-password', { password, token });
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

  return (
    <AuthContext.Provider value={{ user, token, signin, signup, authenticate, update, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
