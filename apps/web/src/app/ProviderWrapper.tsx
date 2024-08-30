'use client';

import { ReactElement } from 'react';

// next
import { SessionProvider } from 'next-auth/react';

// project-imports
import ThemeCustomization from 'themes';
import { ConfigProvider } from 'contexts/ConfigContext';
import ScrollTop from 'components/ScrollTop';

// ==============================|| PROVIDER WRAPPER  ||============================== //

export default function ProviderWrapper({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <ConfigProvider>
      <ThemeCustomization>
        <ScrollTop>
          <SessionProvider refetchInterval={0}>{children}</SessionProvider>
        </ScrollTop>
      </ThemeCustomization>
    </ConfigProvider>
  );
}
