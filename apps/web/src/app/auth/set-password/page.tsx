import * as React from 'react';

import SetPasswordForm from './_components/form';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='grid gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>Set Password</h1>
        <p className='text-balance text-muted-foreground'>Enter your password below to set your new password</p>
      </div>

      <div className='grid gap-4'>
        <SetPasswordForm />
      </div>
    </div>
  );
}
