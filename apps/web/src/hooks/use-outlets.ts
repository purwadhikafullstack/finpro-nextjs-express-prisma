'use client';

import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useOutlets = (filter: ColumnFiltersState, pagination: PaginationState, sorting: SortingState) => {
  const { toast } = useToast();

  const query = new URLSearchParams();
  query.append('page', (pagination.pageIndex + 1).toString());
  query.append('limit', pagination.pageSize.toString());

  if (filter.length > 0) {
    const item = filter[0];
    query.append('id', item.id);
    query.append('value', item.value as string);
  }

  if (sorting.length > 0) {
    const item = sorting[0];
    query.append('key', item.id);
    query.append('desc', item.desc.toString());
  }

  const out = query.toString();

  return useSWR<{
    message: string;
    data: {
      outlets: Outlet[];
      count: number;
    };
  }>('/outlets?' + out, fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to fetch outlets',
        description: error.message,
      });
    },
  });
};
