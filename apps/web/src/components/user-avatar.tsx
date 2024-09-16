'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
import { Check } from 'lucide-react';
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
