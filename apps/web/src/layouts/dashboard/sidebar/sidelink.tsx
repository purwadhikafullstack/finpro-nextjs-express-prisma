'use client';

import * as React from 'react';

import Link from 'next/link';
import { SidebarMenu } from '@/types/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { usePathname } from 'next/navigation';

interface SidebarMenuProps extends React.PropsWithChildren {
  link: SidebarMenu;
}

const SidebarLink: React.FC<SidebarMenuProps> = ({ link }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const authorized = React.useMemo(() => {
    if (user) return link.roles.includes(user.role);
    return false;
  }, [user, link]);

  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className={cn(
        'items-center gap-3 rounded-lg p-3 text-muted-foreground transition-all hover:text-primary hidden',
        pathname === link.href && 'bg-accent text-foreground hover:text-foreground',
        authorized && 'flex'
      )}>
      <Icon className='size-5' />
      {link.title}
    </Link>
  );
};

export default SidebarLink;
