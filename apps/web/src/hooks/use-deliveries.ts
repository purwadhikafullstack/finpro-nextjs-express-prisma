'use client';

import * as React from 'react';

import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

import { Delivery } from '@/types/delivery';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from '@/hooks/use-toast';

export const useDeliveries = (filter: ColumnFiltersState, pagination: PaginationState, sorting: SortingState) => {
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

  const { data, error, isLoading } = useSWR<{
    message: string;
    data: {
      deliveries: Delivery[];
      count: number;
    };
  }>('/deliveries?' + out, fetcher, {
    shouldRetryOnError: false,
  });

  React.useEffect(() => {
    if (data) {
      toast({
        title: 'Devlieries loaded',
        description: 'Your deliveries have been loaded successfully',
      });
    } else if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load deliveries',
        description: error.message,
      });
    }
  }, [data, error, toast]);

  return { data, error, isLoading };
};
