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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Address } from '@/types/address';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/lib/axios';
import useConfirm from '@/hooks/use-confirm';
import { useCustomerAddresses } from '@/hooks/use-customer-addresses';
import { useToast } from '@/hooks/use-toast';

interface AddressListProps {
  //
}

const CustomerAddressTable: React.FC<AddressListProps> = ({ ...props }) => {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { data, error, isLoading, mutate } = useCustomerAddresses();

  const handleSetPrimary = async (address: Address) => {
    confirm({
      title: 'Set as Primary Address',
      description: 'Are you sure you want to set this address as primary?',
    })
      .then(async () => {
        try {
          if (address.is_primary) {
            toast({
              title: 'Address already set as primary',
              description: 'Your address is already set as primary.',
            });
            return;
          }

          await axios.put(`/profile/addresses/${address.customer_address_id}/set-primary`);
          toast({
            title: 'Address set as primary',
            description: 'Your address has been set as primary.',
          });
          mutate();
        } catch (error: any) {
          toast({
            title: 'Failed to set address as primary',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  if (isLoading) return <Skeleton className='w-full h-32 rounded-lg' />;
  if (error || !data) return <div>failed to load</div>;

  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className='h-20 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
          {data.data.map((address, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <div className='flex items-center gap-2 font-medium'>
                  {address.name}
                  {address.is_primary && <Badge>Primary</Badge>}
                </div>
              </TableCell>
              <TableCell>
                <p className='line-clamp-1 text-muted-foreground'>{address.formatted}</p>
              </TableCell>
              <TableCell>
                <span className='text-muted-foreground whitespace-nowrap'>{address.city_district}</span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
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
                      <Link href={'/profile/addresses/' + address.customer_address_id} className='w-full'>
                        <DropdownMenuItem>View Detail</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => handleSetPrimary(address)}>Set as Primary</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerAddressTable;
