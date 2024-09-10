'use client';

import { Bell, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarDrawer from '@/layouts/dashboard/sidebar/drawer';
import UserAvatar from '@/components/user-avatar';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps {
  //
}

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { user } = useAuth();

  return (
    <header className='flex h-16 items-center gap-4 border-b bg-zinc-50 px-6'>
      <SidebarDrawer />

      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>

      <div className='flex space-x-4 items-center'>
        <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
          <Bell className='size-4' />
          <span className='sr-only'>Toggle notifications</span>
        </Button>

        {user && <UserAvatar user={user} />}
      </div>
    </header>
  );
};

export default Header;
