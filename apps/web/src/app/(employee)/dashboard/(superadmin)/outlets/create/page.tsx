import * as React from 'react';

import OutletCreateForm from '../_components/create';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col items-start space-y-2'>
        <h2 className='text-4xl font-bold'>Create Outlet</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          Create and manage your outlets here. You can add, edit, and delete outlets.
        </p>
      </div>

      <OutletCreateForm />
    </>
  );
}
