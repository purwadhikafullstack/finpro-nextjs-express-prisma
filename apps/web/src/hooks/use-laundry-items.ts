'use client';

import { LaundryItem } from '@/types/laundry-item';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useLaundryItems = () => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: LaundryItem[];
  }>('/laundry-items', fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch laundry items',
        description: error.message,
      });
    },
  });
};
