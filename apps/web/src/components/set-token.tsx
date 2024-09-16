'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

interface SetTokenProps {
  token: string;
}

const SetToken: React.FC<SetTokenProps> = ({ token }) => {
  const [_, setToken] = useLocalStorage<string | null>('access_token', null);

  React.useEffect(() => {
    if (token) setToken(token);
  }, [token]);

  return (
    <div className='grid gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>Redirecting...</h1>
        <p className='text-balance text-muted-foreground'>Successfully logged in to your account</p>
      </div>

      <div className='grid gap-4'>
        <p className='text-center'>
          Please wait while we redirect you to the home page. If you are not redirected within a few seconds, please
          click the button below.
        </p>

        <Link href='/'>
          <Button className='w-full'>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default SetToken;
