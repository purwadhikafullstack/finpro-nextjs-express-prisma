'use client';

import { User } from '@/types/user';
import { fetcher } from '@/lib/axios';
import useSWR from 'swr';
import { useToast } from './use-toast';

export const useProfile = () => {
  const { toast } = useToast();

  return useSWR<{
    message: string;
    data: User;
  }>('/profile', fetcher, {
    onError: (error) => {
      toast({
        title: 'Failed to load profile',
        description: error.message,
      });
    },
  });
};
