import * as React from 'react';

import Application from '@/layouts/application/application';
import AuthGuard from '@/components/guard/auth-guard';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  return (
    <AuthGuard
      allowed={['Customer', 'Driver', 'SuperAdmin', 'OutletAdmin', 'WashingWorker', 'IroningWorker', 'PackingWorker']}>
      <Application>{children}</Application>
    </AuthGuard>
  );
}
