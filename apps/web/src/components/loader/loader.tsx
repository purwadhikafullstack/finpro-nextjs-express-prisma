import * as React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface LoaderProps {
  //
}

const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <div className='flex flex-col space-y-8'>
      <Skeleton className='w-80 h-16' />

      <div className='flex flex-col space-y-2'>
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-1/2 h-6' />
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Skeleton className='w-full aspect-video' />
        <Skeleton className='w-full aspect-video' />
        <Skeleton className='w-full aspect-video' />
        <Skeleton className='w-full aspect-video' />
      </div>

      <Skeleton className='w-full h-80' />
    </div>
  );
};

export default Loader;
