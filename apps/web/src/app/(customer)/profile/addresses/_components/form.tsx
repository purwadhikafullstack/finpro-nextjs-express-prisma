'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Location } from '@/types/location';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useLocation } from '@/hooks/use-location';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface AddressFormProps {
  //
}

const MapSkeleton = () => {
  return <Skeleton className='w-full aspect-[4/3] rounded-lg' />;
};

const addressSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required().min(10, 'Address is too short').max(100, 'Address is too long'),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

const AddressForm: React.FC<AddressFormProps> = ({ ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useLocation();
  const [location, setLocation] = React.useState<Location | null>(null);

  const Map = React.useMemo(
    () =>
      dynamic(() => import('@/app/(customer)/profile/addresses/_components/map'), {
        loading: () => <MapSkeleton />,
        ssr: false,
      }),
    []
  );

  const form = useForm<yup.InferType<typeof addressSchema>>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
  });

  React.useEffect(() => {
    if (state) {
      setLocation(state);
      form.setValue('latitude', state.latitude);
      form.setValue('longitude', state.longitude);
    }
  }, [state, form]);

  React.useEffect(() => {
    if (location) {
      form.setValue('latitude', location.latitude);
      form.setValue('longitude', location.longitude);
    }
  }, [form, location]);

  const onSubmit = async (formData: yup.InferType<typeof addressSchema>) => {
    try {
      await axios.post('/profile/addresses', formData);
      toast({
        title: 'Address saved',
        description: 'Your address has been saved successfully',
      });
      router.push('/profile/addresses');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to save address',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <div className='grid gap-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label Name</FormLabel>
                <FormControl>
                  <Input placeholder='enter label name for address' {...form.register('name')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder='enter your address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 gap-6'>
            <FormItem className='flex items-center space-x-2'>
              <FormLabel htmlFor='latitude'>Latitude</FormLabel>
              <Input placeholder='enter your latitude' {...form.register('latitude')} readOnly />
            </FormItem>

            <FormItem className='flex items-center space-x-2'>
              <FormLabel htmlFor='longitude'>Longitude</FormLabel>
              <Input placeholder='enter your longitude' {...form.register('longitude')} readOnly />
            </FormItem>
          </div>

          {location ? <Map location={location} setLocation={setLocation} /> : <MapSkeleton />}
        </div>

        <div className='flex justify-start'>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddressForm;
