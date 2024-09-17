import * as React from 'react';

import AuthGuard from '@/components/guard/auth-guard';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  return (
    <AuthGuard allowed={['SuperAdmin', 'OutletAdmin', 'Driver', 'WashingWorker', 'IroningWorker', 'PackingWorker']}>
      {children}
    </AuthGuard>
  );
}