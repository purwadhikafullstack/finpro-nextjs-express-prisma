import * as React from 'react';

import { Skeleton } from '../ui/skeleton';

interface TableLoaderProps {
  //
}

const TableLoader: React.FC<TableLoaderProps> = ({ ...props }) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col gap-4 lg:flex-row items-center justify-between'>
        <Skeleton className='w-full max-w-lg h-10 rounded-lg' />
        <Skeleton className='w-full max-w-lg h-10 rounded-lg' />
      </div>

      <Skeleton className='w-full h-80 rounded-lg' />

      <div className='flex space-x-4 items-center justify-between'>
        <Skeleton className='w-full max-w-40 h-10 rounded-lg' />

        <div className='flex items-center space-x-2'>
          <Skeleton className='w-full size-10 rounded-lg' />
          <Skeleton className='w-full size-10 rounded-lg' />
          <Skeleton className='w-full size-10 rounded-lg' />
        </div>
      </div>
    </div>
  );
};

export default TableLoader;
