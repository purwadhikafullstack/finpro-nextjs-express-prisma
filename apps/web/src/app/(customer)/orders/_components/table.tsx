'use client';

import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
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
            <TableHead>Order ID</TableHead>
            <TableHead>Delivery Fee</TableHead>
            <TableHead>Laundry Fee</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
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
                  <span className='block w-32 font-medium uppercase truncate'>{order.order_id}</span>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{formatCurrency(order.delivery_fee)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant='secondary'>{formatCurrency(order.laundry_fee)}</Badge>
                </TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{latest && <Badge className='whitespace-nowrap'>{latest.name}</Badge>}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerOrderTable;
