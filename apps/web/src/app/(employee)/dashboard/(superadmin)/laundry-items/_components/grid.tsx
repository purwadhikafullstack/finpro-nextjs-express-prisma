'use client';

import * as React from 'react';

import CreateLaundryItemModal from './create-modal';
import LaundryItemCard from '@/app/(employee)/dashboard/(superadmin)/laundry-items/_components/card';
import Loader from '@/components/loader/loader';
import { useLaundryItems } from '@/hooks/use-laundry-items';

interface LaundryItemGridProps {
  //
}

const LaundryItemGrid: React.FC<LaundryItemGridProps> = ({ ...props }) => {
  const { data, error, isLoading } = useLaundryItems();

  if (isLoading) return <Loader />;
  if (error || !data) return <div>failed to load laundry items data, retrying...</div>;

  return (
    <div className='w-full'>
      <div className='flex flex-col mb-6 space-y-4 lg:justify-between lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4'>
        <div className='flex flex-col items-center w-full space-x-2 space-y-4 lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-4'>
          <CreateLaundryItemModal />
        </div>
      </div>

      {data.data.length === 0 && <div>No laundry items found.</div>}
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {data.data.map((item) => (
          <LaundryItemCard key={item.laundry_item_id} item={item} withAction />
        ))}
      </div>
    </div>
  );
};

export default LaundryItemGrid;
