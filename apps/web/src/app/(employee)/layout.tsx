import * as React from 'react';

import AuthGuard from '@/components/guard/auth-guard';
import DashboardLayout from '@/layouts/dashboard/dashboard';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  return <DashboardLayout>{children}</DashboardLayout>;
}
