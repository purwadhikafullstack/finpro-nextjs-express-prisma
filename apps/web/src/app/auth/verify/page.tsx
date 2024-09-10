import * as React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>Register</h1>
        <p className='text-balance text-muted-foreground'>Enter your email below to create an account</p>
      </div>

      <div className='grid gap-4'>
        <p className='text-center'>
          Please check your email to verify your account. If you did not receive an email, please check your spam
          folder, or contact us at{' '}
          <Link href='mailto:support@example.com'>
            <Button variant='link' className='w-full'>
              support@example.com
            </Button>
          </Link>
        </p>

        <Link href='/auth/login'>
          <Button className='w-full'>Resend Verification Email</Button>
        </Link>
      </div>

      <div className='mt-4 text-center text-sm'>
        Already have an account?{' '}
        <Link href='/auth/login' className='underline'>
          Login
        </Link>
      </div>
    </div>
  );
}
