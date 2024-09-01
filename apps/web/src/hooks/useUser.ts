import { useSession } from 'next-auth/react';

interface UserProps {
  name: string;
  email: string;
  avatar: string;
  thumb: string;
  role: string;
}

export default function useUser() {
  const { data: session } = useSession();
  if (session) {
    const user = session?.user;
    const provider = session?.provider;
    let thumb = user?.image!;
    if (provider === 'cognito') {
      const email = user?.email?.split('@');
      user!.name = email ? email[0] : 'Jone Doe';
    }

    if (!user?.image) {
      user!.image = '/assets/images/users/avatar-1.png';
      thumb = '/assets/images/users/avatar-thumb-1.png';
    }

    const newUser: UserProps = {
      name: user!.name!,
      email: user!.email!,
      avatar: user?.image!,
      thumb,
      role: 'UI/UX Designer',
    };

    return newUser;
  }
  return false;
}
