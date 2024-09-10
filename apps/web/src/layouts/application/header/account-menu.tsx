'use client';

import * as React from 'react';

import AppMenu from './app-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavigationItem } from '@/types/navigation';
import UserAvatar from '@/components/user-avatar';
import { useAuth } from '@/hooks/use-auth';

interface AccountMenuProps {
  menus: NavigationItem[];
}

const AccountMenu: React.FC<AccountMenuProps> = ({ menus }) => {
  const { user } = useAuth();

  return (
    <div className='flex justify-end w-full gap-4'>
      <AppMenu menus={menus} />

      {user ? (
        <UserAvatar user={user} />
      ) : (
        <Link href='/auth/login'>
          <Button variant='outline'>Sign in</Button>
        </Link>
      )}

      <Link href='/dashboard' className='hidden md:block'>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
};

export default AccountMenu;
