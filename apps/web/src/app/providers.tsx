'use client';

import 'aos/dist/aos.css';

import * as React from 'react';

import { AuthProvider } from '@/context/auth';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import dynamic from 'next/dynamic';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default function Provider({ children }: LayoutProps) {
  const AosProvider = React.useMemo(
    () =>
      dynamic(() => import('@/components/aos'), {
        ssr: false,
      }),
    []
  );

  return (
    <AuthProvider>
      <TooltipProvider>
        <AosProvider>
          {children}
          <Toaster />
        </AosProvider>
      </TooltipProvider>
    </AuthProvider>
  );
}
