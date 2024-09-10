'use client';

import * as React from 'react';

import FullscreenLoader from '../loader/fullscreen';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const GuestGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (token) {
      router.push('/');
    }

    setLoading(false);
  }, [token, router]);

  if (loading) return <FullscreenLoader />;
  return <>{children}</>;
};

export default GuestGuard;
