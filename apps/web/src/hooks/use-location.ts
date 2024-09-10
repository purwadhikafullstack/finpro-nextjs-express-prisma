'use client';

import * as React from 'react';

import { Location } from '@/types/location';
import { useToast } from '@/hooks/use-toast';

export const useLocation = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<GeolocationPositionError | null>(null);
  const [state, setState] = React.useState<Location>({
    latitude: -6.1741855,
    longitude: 106.8283778,
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error);
        toast({
          variant: 'destructive',
          title: 'Location failed',
          description: error.message,
        });
      }
    );

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError(error);
        toast({
          variant: 'destructive',
          title: 'Location failed',
          description: error.message,
        });
      }
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, [toast]);

  return { state, error, isLoading: loading };
};
