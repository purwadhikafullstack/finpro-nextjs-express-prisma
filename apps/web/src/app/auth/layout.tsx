import * as React from 'react';

import AuthLayout from '@/layouts/auth/auth';
import GuestGuard from '@/components/guard/guest-guard';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  return (
    <GuestGuard>
      <AuthLayout>{children}</AuthLayout>
    </GuestGuard>
  );
}
