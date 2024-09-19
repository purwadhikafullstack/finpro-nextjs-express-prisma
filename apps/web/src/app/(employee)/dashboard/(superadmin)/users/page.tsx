import * as React from 'react';

import UserTable from './_components/table';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col items-start space-y-2'>
        <h2 className='text-4xl font-bold'>Users Page</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          View and manage your customers here. You can add, edit, and delete customers.
        </p>
      </div>

      <UserTable />
    </>
  );
}
