'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '@/components/table/header';
import { MoreHorizontal } from 'lucide-react';
import { Outlet } from '@/types/outlet';

const columns: ColumnDef<Outlet>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Outlet Name' />;
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Address' />;
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='City' />;
    },
  },
  {
    accessorKey: 'city_district',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='City District' />;
    },
  },
  {
    accessorKey: 'region',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Region' />;
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Actions' />;
    },
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Outlet</DropdownMenuItem>
            <DropdownMenuItem>Delete Outlet</DropdownMenuItem>
            <DropdownMenuItem>View Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
