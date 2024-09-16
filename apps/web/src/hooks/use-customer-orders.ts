'use client';

import { Order, OrderProgress } from '@/types/order';

import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useCustomerOrders = (type: 'All' | 'Ongoing' | 'Completed') => {
  const { toast } = useToast();

  const query = new URLSearchParams();
  query.append('type', type);
  const out = query.toString();

  return useSWR<{
    message: string;
    data: Array<
      Order & {
        Outlet?: Outlet;
        OrderProgress?: OrderProgress[];
      }
    >;
  }>('/profile/orders?' + out, fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch customer orders',
        description: error.message,
      });
    },
  });
};
