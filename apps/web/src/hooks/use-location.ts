'use client';

import * as React from 'react';

import { Location } from '@/types/location';

export const useLocation = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<GeolocationPositionError | null>(null);
  const [state, setState] = React.useState<Location>({
    latitude: 0,
    longitude: 0,
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
        console.log(error);
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
        console.log(error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  return { state, error, isLoading: loading };
};
