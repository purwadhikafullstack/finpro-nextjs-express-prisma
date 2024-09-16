'use client';

import * as React from 'react';

import FullscreenLoader from '../loader/fullscreen';
import { Role } from '@/types/user';
import axios from '@/lib/axios';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps extends React.PropsWithChildren {
  allowed: Role[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowed, children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = useLocalStorage<string | null>('access_token', null);

  React.useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post('/auth/guard', { allowed });
        if (data.protected) {
          toast({
            title: 'You are not authorized',
            description: 'You are not authorized to access this page',
          });
          router.back();
        }
      } catch (error: any) {
        toast({
          title: 'Your session has expired',
          description: 'Your session has expired, please login again',
        });
        setToken(null);
        router.push('/auth/login');
      }
    };

    if (token) verify();
    else {
      toast({
        title: 'You are not logged in',
        description: 'Please login with your credentials',
      });
      router.push('/auth/login');
    }
    setLoading(false);
  }, [token, setToken, allowed, router, toast]);

  if (loading) return <FullscreenLoader />;
  return <>{children}</>;
};

export default AuthGuard;
