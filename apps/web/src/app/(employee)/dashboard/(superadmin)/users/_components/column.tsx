'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '@/components/table/header';
import { MoreHorizontal } from 'lucide-react';
import { User } from '@/types/user';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='User Name' />;
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Phone' />;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Email' />;
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Role' />;
    },
    cell: ({ row }) => {
      return <Badge className='whitespace-nowrap'>{row.original.role}</Badge>;
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
