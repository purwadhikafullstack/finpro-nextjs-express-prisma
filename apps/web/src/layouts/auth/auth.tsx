import AppIcon from '@/components/app-icon';
import Background from '@/assets/background.jpg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AuthProps extends React.PropsWithChildren {
  //
}

const AuthLayout: React.FC<AuthProps> = ({ children }) => {
  return (
    <div className='w-full lg:grid lg:grid-cols-2 h-screen relative'>
      <Link href='/' className='absolute top-0 left-0 m-8 font-semibold gap-2 items-center flex'>
        <AppIcon className='h-6 w-6' />
        <span className=' whitespace-nowrap'>Laundry Express</span>
      </Link>

      <div className='flex items-center justify-center py-12 h-full lg:h-auto'>
        <div className='mx-auto w-96'>{children}</div>
      </div>

      <div className='hidden bg-muted lg:block overflow-hidden'>
        <Image
          src={Background}
          alt='Image'
          width='1920'
          height='1080'
          placeholder='blur'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
};

export default AuthLayout;
