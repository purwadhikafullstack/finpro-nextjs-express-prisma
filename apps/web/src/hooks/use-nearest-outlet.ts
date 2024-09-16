'use client';

import { Outlet } from '@/types/outlet';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';

export const useNearestOutlet = (address_id: string | undefined) => {
  if (!address_id) return { data: null, error: null, isLoading: true };

  const { data, error, isLoading } = useSWR<{
    message: string;
    data: Outlet[];
  }>('/outlets/nearest', fetcher, {
    shouldRetryOnError: false,
  });

  return { data, error, isLoading };
};
