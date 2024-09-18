'use client';

import * as React from 'react';

import Link from 'next/link';
import { NavigationLink } from '@/types/navigation';
import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/use-active-path';

interface LayoutProps extends React.PropsWithChildren {
  label: string;
  description: string;
  links: NavigationLink[];
}

const SubmenuLayout: React.FC<LayoutProps> = ({ label, description, children, links = [] }) => {
  const active = useActivePath();

  return (
    <div className='flex flex-col space-y-8'>
      <div className='grid w-full max-w-6xl gap-2 mx-auto'>
        <h1 className='text-3xl font-semibold'>{label}</h1>
        <p className='text-left text-muted-foreground'>{description}</p>
      </div>

      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav className='grid gap-4 text-sm text-muted-foreground'>
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              <span className={cn(active(link.active || link.href) && 'font-semibold text-primary')}>{link.title}</span>
            </Link>
          ))}
        </nav>

        <div className='grid gap-6'>
          <div className='overflow-hidden'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SubmenuLayout;
