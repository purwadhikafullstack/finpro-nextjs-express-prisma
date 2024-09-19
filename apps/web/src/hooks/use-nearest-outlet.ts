'use client';

import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

interface OutletDistance {
  outlet: Outlet;
  distance: number;
}

export const useNearestOutlet = (customer_address_id: string | null) => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: Array<OutletDistance>;
  }>(
    customer_address_id && [
      '/outlets/nearest',
      {
        params: {
          customer_address_id,
        },
      },
    ],
    fetcher,
    {
      onError: (error) => {
        if (!customer_address_id) return;
        toast({
          variant: 'destructive',
          title: 'Failed to fetch nearest outlets',
          description: error.message,
        });
      },
      onSuccess: (data) => {
        if (data.data.length === 0) {
          toast({
            variant: 'destructive',
            title: 'No outlet found nearby',
            description: 'Please select another address',
          });
        }
      },
    }
  );
};
