import * as React from 'react';

import UserTable from './_components/table';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col space-y-2 items-start'>
        <h2 className='font-bold text-4xl'>Users Page</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          View and manage your customers here. You can add, edit, and delete customers.
        </p>
      </div>

      <UserTable />
    </>
  );
}
