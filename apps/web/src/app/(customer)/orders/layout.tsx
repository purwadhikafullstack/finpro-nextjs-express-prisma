import * as React from 'react';

import SubmenuLayout from '@/layouts/submenu/submenu';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  const links = [
    { title: 'All Orders', href: '/orders', active: '/orders/**' },
    { title: 'Ongoing Order', href: '/orders?status=Ongoing' },
    { title: 'Completed Order', href: '/orders?status=Completed' },
  ];

  return (
    <SubmenuLayout
      label='Manage Orders'
      description='Manage your orders, in this section you can view all your orders and manage them.'
      links={links}>
      {children}
    </SubmenuLayout>
  );
}
