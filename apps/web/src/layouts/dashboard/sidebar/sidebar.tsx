'use client';

import { PROJECT_NAME, SIDEBAR_LINKS } from '@/lib/constant';

import AppIcon from '@/components/app-icon';
import Link from 'next/link';
import SidebarLink from '@/layouts/dashboard/sidebar/sidelink';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <div className={cn('border-r bg-card', className)} {...props}>
      <div className='flex flex-col h-full gap-2'>
        <div className='flex items-center flex-none h-16 px-6 border-b'>
          <Link href='/' className='flex items-center space-x-2 font-semibold'>
            <AppIcon className='w-6 h-6' />
            <span className='whitespace-nowrap'>{PROJECT_NAME}</span>
          </Link>
        </div>

        <div className='flex-1'>
          <nav className='grid items-start gap-1 px-4 text-sm font-medium '>
            {SIDEBAR_LINKS.map((link) => (
              <SidebarLink key={link.title} link={link} />
            ))}
          </nav>
        </div>

        <div className='p-4 mt-auto'>{/* <SidebarCard /> */}</div>
      </div>
    </div>
  );
};

export default Sidebar;
