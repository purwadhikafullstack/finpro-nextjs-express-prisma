'use client';

import * as React from 'react';

import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { Plus, Shirt } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Loader from '@/components/loader/loader';
import { useDebounceValue } from 'usehooks-ts';
import { useLaundryItems } from '@/hooks/use-laundry-items';

interface LaundryItemGridProps {
  //
}

const LaundryItemGrid: React.FC<LaundryItemGridProps> = ({ ...props }) => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const { data, error, isLoading } = useLaundryItems();

  if (isLoading) return <Loader />;
  if (error || !data) return <div>failed to load laundry items data, retrying...</div>;

  return (
    <div className='w-full'>
      <div className='flex flex-col mb-6 space-y-4 lg:justify-between lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4'>
        <div className='flex flex-col items-center w-full space-x-2 space-y-4 lg:w-auto lg:flex-row lg:space-y-0 lg:space-x-4'>
          <Link href='/dashboard/laundry-items/create' className='w-full'>
            <Button className='w-full'>
              <Plus className='inline-block w-4 h-4 mr-2' />
              <span>Add Laundry Items</span>
            </Button>
          </Link>
        </div>
      </div>

      {data.data.length === 0 && <div>No laundry items found.</div>}

      <div className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6'>
        {data.data.map((item) => (
          <div
            key={item.laundry_item_id}
            className='relative border rounded-lg group hover:border-primary hover:cursor-pointer'>
            <div className='flex items-end p-6 aspect-square'>
              <h3 className='text-lg font-medium group-hover:text-primary'>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaundryItemGrid;
