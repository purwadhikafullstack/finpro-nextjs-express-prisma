import * as React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LoginForm from './_components/form';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='text-balance text-muted-foreground'>Enter your email below to login to your account</p>
      </div>
      <div className='grid gap-4'>
        <LoginForm />

        <Button variant='outline' className='w-full'>
          Register with Google
        </Button>
      </div>
      <div className='mt-4 text-center text-sm'>
        Don&apos;t have an account?{' '}
        <Link href='/auth/register' className='underline'>
          Sign up
        </Link>
      </div>
    </div>
  );
}
