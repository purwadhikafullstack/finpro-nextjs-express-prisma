'use client';

import { Customer, User } from '@/types/user';
import { Order, OrderItem, OrderProgress } from '@/types/order';

import { Address } from '@/types/address';
import { LaundryItem } from '@/types/laundry-item';
import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useOrderDetail = (order_id: string) => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: Order & {
      OrderItem: Array<
        OrderItem & {
          LaundryItem: LaundryItem;
        }
      >;
      Outlet: Outlet;
      Customer: Customer & {
        User: User;
      };
      CustomerAddress: Address;
      OrderProgress: OrderProgress[];
    };
  }>('/orders/' + order_id, fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch order detail',
        description: error.message,
      });
    },
  });
};
