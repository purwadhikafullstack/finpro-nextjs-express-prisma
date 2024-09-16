import * as React from 'react';
import JobTable from './_components/table';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <>
      <div className='flex flex-col items-start space-y-2'>
        <h2 className='text-4xl font-bold'>Jobs Page</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          Managing a small business today is already tough. Avoid further complications by ditching outdated.
        </p>
      </div>

      <JobTable />
    </>
  );
}
