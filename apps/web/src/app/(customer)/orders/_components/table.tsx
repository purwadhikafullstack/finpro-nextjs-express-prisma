'use client';

import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Order, OrderProgress } from '@/types/order';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatDateTime } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { OrderStatusMapper } from '@/lib/constant';
import { Outlet } from '@/types/outlet';
import { useCustomerOrders } from '@/hooks/use-customer-orders';

interface CustomerOrderTableProps {
  type: 'All' | 'Ongoing' | 'Completed';
}

const CustomerOrderTable: React.FC<CustomerOrderTableProps> = ({ type, ...props }) => {
  const { data, error, isLoading } = useCustomerOrders(type);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load orders data, retrying...</div>;

  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Delivery Fee</TableHead>
            <TableHead>Laundry Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className='h-20 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
          {data.data.map((order, idx) => {
            const latest = order.OrderProgress && order.OrderProgress.at(0);

            return (
              <TableRow key={idx}>
                <TableCell>
                  <Badge variant='secondary'>{formatCurrency(order.delivery_fee)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{formatCurrency(order.laundry_fee)}</Badge>
                </TableCell>
                <TableCell>
                  {latest && <Badge className='whitespace-nowrap'>{OrderStatusMapper[latest.status]}</Badge>}
                </TableCell>
                <TableCell>
                  <span className='whitespace-nowrap text-muted-foreground'>{formatDateTime(order.created_at)}</span>
                </TableCell>
                <TableCell>
                  <TableAction order={order} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

interface TableActionProps {
  order: Order & {
    Outlet?: Outlet;
    OrderProgress?: OrderProgress[];
  };
}

const TableAction: React.FC<TableActionProps> = ({ order }) => {
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
        <Link href={'/orders/' + order.order_id} className='w-full'>
          <DropdownMenuItem>View Order</DropdownMenuItem>
        </Link>
        {order.is_payable && (
          <Link href={'/orders/' + order.order_id + '/payment'} className='w-full'>
            <DropdownMenuItem>Process Payment</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerOrderTable;
