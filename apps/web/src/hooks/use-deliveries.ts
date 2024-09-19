'use client';

import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

import { Delivery } from '@/types/delivery';
import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useDeliveries = (filter: ColumnFiltersState, pagination: PaginationState, sorting: SortingState) => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: {
      deliveries: Array<
        Delivery & {
          Outlet: Outlet;
        }
      >;
      count: number;
    };
  }>(
    [
      '/deliveries',
      {
        params: {
          page: (pagination.pageIndex + 1).toString(),
          limit: pagination.pageSize.toString(),
          ...(filter.length > 0 && {
            id: filter[0].id,
            value: filter[0].value as string,
          }),
          ...(sorting.length > 0 && {
            key: sorting[0].id,
            desc: sorting[0].desc.toString(),
          }),
        },
      },
    ],
    fetcher,
    {
      onError: (error) => {
        toast({
          title: 'Failed to fetch deliveries',
          description: error.message,
        });
      },
    }
  );
};
