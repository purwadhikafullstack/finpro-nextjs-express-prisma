'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Check, LayoutGrid, LogOut, ShoppingBag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AVATAR_LINKS } from '@/lib/constant';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { UserToken } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface UserAvatarProps {
  user: UserToken;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const router = useRouter();
  const { signout } = useAuth();
  const { toast } = useToast();

  const handleSignout = async () => {
    try {
      await signout();
      toast({
        title: 'Signout successful',
        description: 'logged out successfully',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        title: 'Signout failed',
        description: error.message,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='border cursor-pointer'>
          <AvatarImage src={user.avatar_url || '/avatar/default.png'} />
          <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        <div className='flex flex-col py-2 space-y-0'>
          <DropdownMenuLabel className='flex items-center space-x-2 space-y-0'>
            <span>{user.fullname}</span>
            {user.is_verified && (
              <Badge className='p-px text-xs aspect-square'>
                <Check className='size-2' />
              </Badge>
            )}
          </DropdownMenuLabel>
          <span className='px-2 text-sm text-muted-foreground'>{user.email}</span>
        </div>
        <DropdownMenuSeparator />
        {AVATAR_LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <Link key={link.title} href={link.href}>
              <DropdownMenuItem className='cursor-pointer'>
                <div className='flex items-center justify-between w-full'>
                  <span>{link.title}</span>
                  <Icon className='size-4 text-muted-foreground' />
                </div>
              </DropdownMenuItem>
            </Link>
          );
        })}
        {user && user.role !== 'Customer' ? (
          <Link href='/dashboard'>
            <DropdownMenuItem className='cursor-pointer'>
              <div className='flex items-center justify-between w-full'>
                <span>Dashboard</span>
                <LayoutGrid className='size-4 text-muted-foreground' />
              </div>
            </DropdownMenuItem>
          </Link>
        ) : (
          <Link href='/request'>
            <DropdownMenuItem className='cursor-pointer'>
              <div className='flex items-center justify-between w-full'>
                <span>Place Order</span>
                <ShoppingBag className='size-4 text-muted-foreground' />
              </div>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={() => handleSignout()}>
          <div className='flex items-center justify-between w-full'>
            <span>Logout</span>
            <LogOut className='size-4 text-muted-foreground' />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
