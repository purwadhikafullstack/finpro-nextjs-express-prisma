'use client';

import { Check, CheckCircle, CircleUser } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AVATAR_LINKS } from '@/lib/constant';
import { Badge } from './ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface UserAvatarProps {
  user: User;
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
        <Button variant='secondary' size='icon' className='rounded-full'>
          <CircleUser className='size-5' />
          <span className='sr-only'>Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <div className='flex items-center space-x-1 py-2'>
          <DropdownMenuLabel>{user.fullname}</DropdownMenuLabel>
          <Badge variant='default' className='text-xs aspect-square p-0.5'>
            {user.is_verified ? <Check className='size-3' /> : 'Unverified'}
          </Badge>
        </div>
        <DropdownMenuSeparator />
        {user.role !== 'Customer' && (
          <Link href='/dashboard'>
            <DropdownMenuItem className='cursor-pointer'>Dashboard</DropdownMenuItem>
          </Link>
        )}
        {AVATAR_LINKS.map((link) => (
          <Link key={link.title} href={link.href}>
            <DropdownMenuItem className='cursor-pointer'>{link.title}</DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleSignout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
