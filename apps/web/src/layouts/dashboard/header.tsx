'use client';

import { Bell, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SidebarDrawer from '@/layouts/dashboard/sidebar/drawer';
import UserAvatar from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  const { user } = useAuth();

  return (
    <header className={cn('flex items-center w-full h-16 gap-4 px-6 border-b bg-zinc-50', className)} {...props}>
      <SidebarDrawer />

      <div className='flex-1 w-full'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>

      <div className='flex items-center space-x-4'>
        <Button variant='outline' size='icon' className='w-8 h-8 ml-auto'>
          <Bell className='size-4' />
          <span className='sr-only'>Toggle notifications</span>
        </Button>

        {user && <UserAvatar user={user} />}
      </div>
    </header>
  );
};

export default Header;
