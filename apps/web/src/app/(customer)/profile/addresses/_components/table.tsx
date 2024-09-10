'use client';

import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { useCustomerAddress } from '@/hooks/use-customer-addres';

interface AddressListProps {
  //
}

const AddressTable: React.FC<AddressListProps> = ({ ...props }) => {
  const { data, error, isLoading } = useCustomerAddress();

  if (error || !data) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead className='hidden sm:table-cell'>City</TableHead>
            <TableHead className='hidden md:table-cell'>Region</TableHead>
            <TableHead className='hidden md:table-cell'>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((address, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className='font-medium flex items-center gap-2'>
                  {address.address}
                  {address.is_primary && (
                    <Badge className='text-xs' variant='secondary'>
                      Primary
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>{address.city}</TableCell>
              <TableCell className='hidden md:table-cell'>{address.region}</TableCell>
              <TableCell className='hidden md:table-cell'>{formatDate(address.created_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddressTable;
