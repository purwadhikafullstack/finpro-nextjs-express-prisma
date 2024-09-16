import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import TableLoader from './table';

interface LoaderProps {
  //
}

const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col space-y-4'>
        <Skeleton className='w-80 h-12' />
        <Skeleton className='w-full h-6' />
      </div>

      <TableLoader />
    </div>
  );
};

export default Loader;
