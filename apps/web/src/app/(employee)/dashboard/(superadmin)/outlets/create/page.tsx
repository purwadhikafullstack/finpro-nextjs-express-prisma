import * as React from 'react';

import OutletCreate from '../_components/craete';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col space-y-2 items-start'>
        <h2 className='font-bold text-4xl'>Create Outlet</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          Create and manage your outlets here. You can add, edit, and delete outlets.
        </p>
      </div>

      <OutletCreate />
    </>
  );
}
