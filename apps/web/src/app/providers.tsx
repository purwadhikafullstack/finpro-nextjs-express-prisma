'use client';

import 'aos/dist/aos.css';

import * as React from 'react';

import { AuthProvider } from '@/context/auth';
import { ConfirmProvider } from '@/context/confirm';
import { ThemeProvider } from '@/components/theme-provider';
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
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <AuthProvider>
        <ConfirmProvider>
          <TooltipProvider>
            <AosProvider>
              {children}
              <Toaster />
            </AosProvider>
          </TooltipProvider>
        </ConfirmProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
