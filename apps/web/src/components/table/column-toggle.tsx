'use client';

import { Columns2, PanelsTopLeft } from 'lucide-react';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';

interface ColumnToggle<TData> {
  table: Table<TData>;
}

function ToggleColumn<TData>({ table }: ColumnToggle<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='hidden ml-auto lg:flex'>
          <Columns2 className='w-4 h-4 mr-2' />
          Toggle Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {column.id
                  .split('_')
                  .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(' ')}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ToggleColumn;
