'use client';

import { lazy, ReactNode } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
const Header = lazy(() => import('./Header'));
const SimpleHeader = lazy(() => import('./SimpleHeader'));
const FooterBlock = lazy(() => import('./FooterBlock'));
const SimpleFooter = lazy(() => import('./SimpleFooter'));

// project-imports
import Loader from 'components/Loader';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { menuMasterLoading } = useGetMenuMaster();

  const pathname = usePathname();

  if (menuMasterLoading) return <Loader />;

  return (
    <>
      {pathname === '/' ? <Header /> : <SimpleHeader />}
      {children}
      {pathname === '/' ? <FooterBlock /> : <SimpleFooter />}
    </>
  );
}
