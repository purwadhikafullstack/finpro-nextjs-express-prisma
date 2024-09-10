import * as React from 'react';

import Application from '@/layouts/application/application';

interface LayoutProps extends React.PropsWithChildren {
  //
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
  return <Application containerized={false}>{children}</Application>;
}
