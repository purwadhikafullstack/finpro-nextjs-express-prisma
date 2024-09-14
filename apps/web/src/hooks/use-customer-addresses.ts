'use client';

import { Address } from '@/types/address';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useCustomerAddresses = () => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: Address[];
  }>('/profile/addresses', fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch customer address',
        description: error.message,
      });
    },
  });
};
