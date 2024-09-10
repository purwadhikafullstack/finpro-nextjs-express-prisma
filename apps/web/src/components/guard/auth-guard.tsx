'use client';

import * as React from 'react';

import FullscreenLoader from '../loader/fullscreen';
import { Role } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps extends React.PropsWithChildren {
  allowed: Role[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowed, children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { token } = useAuth();
  const [authhorized, setAuthhorized] = React.useState(false);

  React.useEffect(() => {
    if (token) {
      const verify = async () => {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          body: JSON.stringify({ token, allowed }),
        });
        const json = await res.json();

        if (json.protected) {
          router.push('/');
          toast({
            title: 'You are not authorized',
            description: 'Please login with your credentials',
          });
        } else setAuthhorized(true);
      };

      verify();
    } else {
      window.location.href = '/auth/login';
      toast({
        title: 'You are not logged in',
        description: 'Please login with your credentials',
      });
    }
  }, [token, allowed, router, toast]);

  if (!authhorized) return <FullscreenLoader />;
  return <>{children}</>;
};

export default AuthGuard;
