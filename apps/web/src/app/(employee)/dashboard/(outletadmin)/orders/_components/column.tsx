'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order, OrderProgress } from '@/types/order';
import { formatCurrency, formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import DataTableColumnHeader from '@/components/table/header';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Outlet } from '@/types/outlet';
import { User } from '@/types/user';

const columns: ColumnDef<
  Order & {
    Outlet?: Outlet;
    Customer?: {
      User?: User;
    };
    OrderProgress?: OrderProgress;
  }
>[] = [
  {
    accessorKey: 'order_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Order ID' />;
    },
    cell: ({ row }) => {
      return <span className='block w-32 font-medium uppercase truncate'>{row.original.order_id}</span>;
    },
  },
  {
    enableSorting: false,
    accessorKey: 'Customer.User.fullname',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Customer Name' />;
    },
  },
  {
    accessorKey: 'delivery_fee',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Delivery Fee' />;
    },
    cell: ({ row }) => {
      return <Badge variant='secondary'>{formatCurrency(row.original.delivery_fee)}</Badge>;
    },
  },
  {
    accessorKey: 'laundry_fee',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Laundry Fee' />;
    },
    cell: ({ row }) => {
      return <Badge variant='secondary'>{formatCurrency(row.original.laundry_fee)}</Badge>;
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Created' />;
    },
    cell: ({ row }) => {
      return <span className='whitespace-nowrap'>{formatDate(row.getValue('created_at') as string)}</span>;
    },
  },
  {
    enableSorting: false,
    accessorKey: 'OrderProgress.name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Order Progress' />;
    },
    cell: ({ row }) => {
      return <Badge className='whitespace-nowrap'>{row.original.OrderProgress?.name}</Badge>;
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
            <Link href={'/dashboard/orders/' + row.original.order_id} className='w-full'>
              <DropdownMenuItem>View Order</DropdownMenuItem>
            </Link>
            <Link href={'/dashboard/orders/' + row.original.order_id + '/create'} className='w-full'>
              <DropdownMenuItem>Add Order Items</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
