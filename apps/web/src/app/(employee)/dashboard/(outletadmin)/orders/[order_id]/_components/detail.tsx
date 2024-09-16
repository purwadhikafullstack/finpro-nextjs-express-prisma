'use client';

import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, formatDateTime } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { useOrderDetail } from '@/hooks/use-order-detail';

interface ComponentProps {
  order_id: string;
}

const OrderDetail: React.FC<ComponentProps> = ({ order_id, ...props }) => {
  const { data, error, isLoading } = useOrderDetail(order_id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load order data, retrying...</div>;

  return (
    <div className='grid items-start gap-8 lg:grid-cols-5'>
      <div className='flex flex-col gap-8 lg:col-span-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Outlet Detail</CardTitle>
            <CardDescription>Make sure to add all the details of your outlet.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='grid gap-4'>
              <div className='flex flex-col space-y-4 text-sm'>
                <DetailList title='Order ID' data={data.data.order_id.toUpperCase()} />
                <DetailList title='Customer Name' data={data.data.Customer.User.fullname} />
                <DetailList title='Customer Email' data={data.data.Customer.User.email} />
                <DetailList title='Customer Address' data={data.data.CustomerAddress.address} />
                <DetailList title='Outlet Name' data={data.data.Outlet.name} />
                <DetailList title='Outlet Address' data={data.data.Outlet.address} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Order Progress</CardTitle>
            <CardDescription>Manage your order progress.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='relative flex flex-col space-y-4'>
              {data.data.OrderProgress.map((item, idx) => (
                <div key={idx} className='flex items-center space-x-4 text-sm'>
                  <div
                    className={cn(
                      'flex items-center justify-center flex-none font-bold rounded-full size-8 aspect-square bg-muted',
                      idx === data.data.OrderProgress.length - 1 && 'text-white bg-primary'
                    )}>
                    {idx + 1}
                  </div>
                  <div className='flex items-center justify-between w-full'>
                    <span className='font-medium'>{item.name}</span>
                    <Badge variant='outline'>{formatDateTime(item.created_at)}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-8 lg:col-span-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Order Items</CardTitle>
            <CardDescription>Make sure to add all the details of your outlet.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className='text-right'>Weight</TableHead>
                    <TableHead className='text-right'>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.OrderItem.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className='h-20 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                  {data.data.OrderItem.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.LaundryItem.name}</TableCell>
                      <TableCell className='text-right'>{item.weight} kg</TableCell>
                      <TableCell className='text-right'>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DetailList: React.FC<{ title: string; data: string | undefined }> = ({ title, data }) => {
  return (
    <div className='flex flex-col space-y-4 text-sm'>
      <div className='flex w-full space-x-2 items-bottom'>
        <span className='flex-none'>{title}</span>
        <div className='w-full border-b border-dotted border-muted-foreground'></div>
        <span className='flex-none text-muted-foreground'>{data}</span>
      </div>
    </div>
  );
};

export default OrderDetail;
