import * as React from 'react';

import OutletTable from './_components/table';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col space-y-2 items-start'>
        <h2 className='font-bold text-4xl'>Outlets Page</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          Managing a small business today is already tough. Avoid further complications by ditching outdated.
        </p>
      </div>

      <OutletTable />
    </>
  );
}
