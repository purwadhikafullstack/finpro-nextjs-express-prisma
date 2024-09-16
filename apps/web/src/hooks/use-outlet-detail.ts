'use client';

import { Employee } from '@/types/user';
import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useOutletDetail = (outlet_id: string) => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: Outlet & {
      Employee: Array<
        Employee & {
          User: {
            user_id: string;
            email: string;
            fullname: string;
            role: string;
          };
        }
      >;
    };
  }>('/outlets/' + outlet_id, fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch outlet detail',
        description: error.message,
      });
    },
  });
};
