'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Outlet } from '@/types/outlet';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import { useCustomerAddresses } from '@/hooks/use-customer-addresses';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface RequestOrderFormProps {
  //
}

const requestOrderSchema = yup.object({
  customer_address_id: yup.string().required(),
  outlet_id: yup.string().required(),
});

interface OutletDistance {
  outlet: Outlet;
  distance: number;
}

const RequestOrderForm: React.FC<RequestOrderFormProps> = ({ ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data } = useCustomerAddresses();
  const [outlets, setOutlets] = React.useState<OutletDistance[]>([]);

  const form = useForm<yup.InferType<typeof requestOrderSchema>>({
    resolver: yupResolver(requestOrderSchema),
    defaultValues: {
      customer_address_id: '',
      outlet_id: '',
    },
  });

  const address = form.watch('customer_address_id');

  React.useEffect(() => {
    if (address) {
      const fetchOutlets = async () => {
        try {
          const { data } = await axios.get('/outlets/nearest', {
            params: {
              customer_address_id: address,
            },
          });
          setOutlets(data.data);
          if (data.data.length === 0) {
            toast({
              variant: 'destructive',
              title: 'No outlet found nearby, please select another address',
            });
          }
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to load outlets',
            description: error.message,
          });
        }
      };

      form.setValue('outlet_id', '');
      fetchOutlets();
    }
  }, [address, toast, form]);

  const onSubmit = async (formData: yup.InferType<typeof requestOrderSchema>) => {
    try {
      await axios.post('/deliveries/request', formData);
      toast({
        title: 'Order created',
        description: 'Your order has been created successfully',
      });
      router.push('/orders');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to create order',
        description: error.message,
      });
    }
  };

  const selectedOutlet = outlets.find((item) => item.outlet.outlet_id === form.watch('outlet_id'));
  if (!data || data.data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Create Order</CardTitle>
          <CardDescription>Create new laundry order to the nearest outlet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-center w-full h-96'>
            <div className='flex flex-col items-center justify-center'>
              <div className='text-center'>
                <p className='text-2xl font-bold'>No addresses found</p>
                <p className='text-muted-foreground'>Please add your addresses to start creating orders.</p>
              </div>
              <Link href='/profile/addresses/create' className='mt-4'>
                <Button className='mt-4'>Add Address</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Create Order</CardTitle>
            <CardDescription>Create new laundry order to the nearest outlet.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <FormField
                control={form.control}
                name='customer_address_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Addresses</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
                            {!field.value && 'Select address'}
                            {field.value && data.data.find((a) => a.customer_address_id === field.value)?.name}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0 popover-content-width-full' align='end'>
                        <Command>
                          <CommandInput placeholder='Search address...' />
                          <CommandList>
                            <CommandEmpty>No address found.</CommandEmpty>
                            <CommandGroup>
                              {data.data.map((address) => (
                                <CommandItem
                                  value={address.customer_address_id}
                                  key={address.customer_address_id}
                                  onSelect={() => {
                                    form.setValue('customer_address_id', address.customer_address_id);
                                  }}>
                                  <div className='flex flex-col'>
                                    <div className='flex items-center space-x-2'>
                                      <span className='text-sm font-medium'>{address.name}</span>
                                      {address.is_primary && <Badge>Primary</Badge>}
                                    </div>
                                    <div className='text-xs text-muted-foreground'>{address.address}</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='outlet_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearest Outlets</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={!outlets || outlets.length === 0}
                            variant='outline'
                            role='combobox'
                            className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
                            {field.value
                              ? outlets.find((item) => item.outlet.outlet_id === field.value)?.outlet.name
                              : 'Select outlet'}
                            <ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-full p-0 popover-content-width-full' align='end'>
                        <Command>
                          <CommandInput placeholder='Search outlet...' />
                          <CommandList>
                            <CommandEmpty>No outlet found.</CommandEmpty>
                            <CommandGroup>
                              {outlets.map((item) => (
                                <CommandItem
                                  value={item.outlet.outlet_id}
                                  key={item.outlet.outlet_id}
                                  onSelect={() => {
                                    form.setValue('outlet_id', item.outlet.outlet_id);
                                  }}>
                                  <div className='flex flex-col'>
                                    <div className='flex items-center space-x-2'>
                                      <span className='text-sm font-medium'>{item.outlet.name}</span>
                                      <Badge>{Number(item.distance).toFixed(2)} km</Badge>
                                    </div>
                                    <div className='text-xs text-muted-foreground'>{item.outlet.address}</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Distance</FormLabel>
                <Input readOnly defaultValue={selectedOutlet && Number(selectedOutlet.distance).toFixed(2) + ' km'} />
              </div>

              <div>
                <FormLabel>Total Price</FormLabel>
                <Input
                  readOnly
                  defaultValue={selectedOutlet && 'Rp.' + Math.ceil(Number(selectedOutlet.distance)) * 5000}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className='flex justify-start'>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
                Place Order
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RequestOrderForm;
