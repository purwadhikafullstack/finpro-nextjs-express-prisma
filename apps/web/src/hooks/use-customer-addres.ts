'use client';

import { Address } from '@/types/address';
import React from 'react';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useCustomerAddress = () => {
  const { toast } = useToast();

  const { data, error, isLoading } = useSWR<{
    message: string;
    data: Address[];
  }>('/profile/addresses', fetcher, {
    shouldRetryOnError: false,
  });

  React.useEffect(() => {
    if (data) {
      toast({
        title: 'Addresses loaded',
        description: 'Your addresses have been loaded successfully',
      });
    } else if (error) {
      toast({
        title: 'Failed to load addresses',
        description: error.message,
      });
    }
  }, [data, error, toast]);

  return { data, error, isLoading };
};
