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
import Link from 'next/link';
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
            <Button variant='ghost' className='w-8 h-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/dashboard/outlets/' + row.original.outlet_id} className='w-full'>
              <DropdownMenuItem>View Oultet</DropdownMenuItem>{' '}
            </Link>
            <Link href={'/dashboard/outlets/' + row.original.outlet_id + '/edit'} className='w-full'>
              <DropdownMenuItem>Edit Outlet</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Delete Outlet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
