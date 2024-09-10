'use client';

import { Menu, X } from 'lucide-react';

import AccountMenu from './account-menu';
import AppIcon from '@/components/app-icon';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NavigationItem } from '@/types/navigation';
import { PROJECT_NAME } from '@/lib/constant';
import { useState } from 'react';

interface HeaderProps {
  menus: NavigationItem[];
}

const Header: React.FC<HeaderProps> = ({ menus }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className='w-full z-40'>
      <div className='container relative min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-2 items-center'>
        <Link href='/'>
          <div className='flex items-center space-x-2 font-semibold'>
            <AppIcon className='h-6 w-6' />
            <p className=' whitespace-nowrap'>{PROJECT_NAME}</p>
          </div>
        </Link>

        <AccountMenu menus={menus} />

        <div className='flex w-12 shrink lg:hidden items-end justify-end'>
          <Button variant='ghost' onClick={() => setOpen(!isOpen)} size='icon'>
            {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </Button>

          {isOpen && (
            <div className='absolute top-20 border-t flex flex-col w-full right-0 bg-background border-b py-4 container gap-8 z-10'>
              {menus.map((menu) => (
                <div key={menu.title}>
                  <div className='flex flex-col gap-2'>
                    {menu.items.map((subItem) => (
                      <Link key={subItem.title} href={subItem.href} className='flex justify-between items-center'>
                        <span className='text-muted-foreground'>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
