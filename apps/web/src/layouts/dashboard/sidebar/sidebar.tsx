'use client';

import { PROJECT_NAME, SIDEBAR_LINKS } from '@/lib/constant';

import AppIcon from '@/components/app-icon';
import Link from 'next/link';
import SidebarCard from '@/layouts/dashboard/sidebar/card';
import SidebarLink from '@/layouts/dashboard/sidebar/sidelink';

interface SidebarProps {
  //
}

const Sidebar: React.FC<SidebarProps> = ({ ...props }) => {
  return (
    <div className='hidden border-r bg-zinc-50/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-16 items-center border-b px-6'>
          <Link href='/' className='flex items-center space-x-2 font-semibold'>
            <AppIcon className='h-6 w-6' />
            <span className='whitespace-nowrap'>{PROJECT_NAME}</span>
          </Link>
        </div>

        <div className='flex-1'>
          <nav className='grid items-start px-4 gap-1 text-sm font-medium '>
            {SIDEBAR_LINKS.map((link) => (
              <SidebarLink key={link.title} link={link} />
            ))}
          </nav>
        </div>

        <div className='mt-auto p-4'>
          <SidebarCard />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
