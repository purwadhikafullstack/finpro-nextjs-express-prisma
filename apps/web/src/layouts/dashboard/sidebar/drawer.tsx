import * as React from 'react';

import { PROJECT_NAME, SIDEBAR_LINKS } from '@/lib/constant';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import AppIcon from '@/components/app-icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import SidebarCard from '@/layouts/dashboard/sidebar/card';
import SidebarLink from '@/layouts/dashboard/sidebar/sidelink';

interface DrawerProps {
  //
}

const SidebarDrawer: React.FC<DrawerProps> = ({ ...props }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='size-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side='left' className='flex flex-col'>
        <Link href='/' className='flex items-center gap-2 px-3 text-lg font-semibold'>
          <AppIcon className='h-6 w-6' />
          <span>{PROJECT_NAME}</span>
        </Link>

        <nav className='grid items-start gap-1 text-sm font-medium mt-6'>
          {SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.title} link={link} />
          ))}
        </nav>

        <div className='mt-auto'>
          <SidebarCard />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarDrawer;
