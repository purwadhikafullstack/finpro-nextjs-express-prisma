'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Minus, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LaundryItem } from '@/types/laundry-item';
import axios from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { useLaundryItems } from '@/hooks/use-laundry-items';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface OrderItemsFormProps {
  order_id: string;
}

const orderItemsSchema = yup.object({
  order_items: yup
    .array(
      yup
        .object({
          name: yup.string().required(),
          weight: yup.number().required(),
          quantity: yup.number().required(),
          laundry_item_id: yup.string().required(),
        })
        .required()
    )
    .required(),
});

interface ChoosenItem {
  name: string;
  weight: number;
  quantity: number;
  laundry_item_id: string;
}

const OrderItemsForm: React.FC<OrderItemsFormProps> = ({ order_id, ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data, error, isLoading } = useLaundryItems();
  const [orderItems, setOrderItems] = React.useState<ChoosenItem[]>([]);

  const form = useForm<yup.InferType<typeof orderItemsSchema>>({
    resolver: yupResolver(orderItemsSchema),
    defaultValues: {
      order_items: [],
    },
  });

  React.useEffect(() => {
    form.setValue('order_items', orderItems);
  }, [form, orderItems]);

  const onSubmit = async (formData: yup.InferType<typeof orderItemsSchema>) => {
    try {
      await axios.post('/orders/' + order_id + '/items', formData);
      toast({
        title: 'Order created',
        description: 'Your order has been created successfully',
      });
      router.push('/dashboard/orders');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to create order',
        description: error.message,
      });
    }
  };

  const handleItemClick = (item: LaundryItem) => {
    const index = orderItems.findIndex((orderitem) => item.laundry_item_id === orderitem.laundry_item_id);
    if (index === -1) {
      setOrderItems([
        ...orderItems,
        {
          name: item.name,
          weight: 0,
          quantity: 1,
          laundry_item_id: item.laundry_item_id,
        },
      ]);
    } else {
      const choosen = [...orderItems];
      choosen[index].quantity++;
      setOrderItems(choosen);
    }
  };

  const handleQuantityChange = (item: ChoosenItem, type: 'increase' | 'decrease') => {
    const index = orderItems.findIndex((orderitem) => item.laundry_item_id === orderitem.laundry_item_id);
    if (index === -1) return;

    const choosen = [...orderItems];
    choosen[index].quantity = type === 'increase' ? choosen[index].quantity + 1 : choosen[index].quantity - 1;
    if (choosen[index].quantity === 0) choosen.splice(index, 1);

    setOrderItems(choosen);
  };

  const handleWeightChange = (item: ChoosenItem, e: React.ChangeEvent<HTMLInputElement>) => {
    const index = orderItems.findIndex((orderitem) => item.laundry_item_id === orderitem.laundry_item_id);
    if (index === -1) return;

    const choosen = [...orderItems];
    choosen[index].weight = Math.max(0, Number(e.target.value));

    setOrderItems(choosen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load laundry items data, retrying...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid items-start gap-8 lg:grid-cols-5'>
        <div className='flex flex-col gap-8 lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Laundry Items</CardTitle>
              <CardDescription>Choose your laundry items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                {data.data.map((item) => (
                  <div
                    onClick={() => handleItemClick(item)}
                    key={item.laundry_item_id}
                    className='relative border rounded-lg group hover:cursor-pointer'>
                    <div className='flex items-end p-6'>
                      <h3 className='text-sm font-medium group-hover:text-primary'>{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-col gap-8 lg:col-span-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between w-full text-xl font-bold'>
                <span>Order Items</span>
                <span className='uppercase text-muted-foreground'>#{order_id}</span>
              </CardTitle>
              <CardDescription>Manage your order items.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <FormLabel>Order Items</FormLabel>
                <div className='border rounded-md'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-1/3'>Name</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead className='text-end'>Quantity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {form.watch('order_items').length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className='h-20 text-center'>
                            No results.
                          </TableCell>
                        </TableRow>
                      )}

                      {form.watch('order_items').map((orderItem: ChoosenItem, idx) => (
                        <TableRow key={idx}>
                          <TableCell className='font-medium'>{orderItem.name}</TableCell>
                          <TableCell className='font-medium'>
                            <Input
                              type='number'
                              value={orderItem.weight}
                              onChange={(e) => handleWeightChange(orderItem, e)}
                            />
                          </TableCell>
                          <TableCell className='font-medium text-end'>
                            <div className='flex items-center justify-end space-x-2'>
                              <Button
                                onClick={() => handleQuantityChange(orderItem, 'decrease')}
                                type='button'
                                variant='outline'
                                size='icon'>
                                <Minus className='size-4' />
                              </Button>
                              <span>{orderItem.quantity}</span>
                              <Button
                                onClick={() => handleQuantityChange(orderItem, 'increase')}
                                type='button'
                                variant='outline'
                                size='icon'>
                                <Plus className='size-4' />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex justify-end w-full'>
                <Button type='submit'>Confirm Order</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default OrderItemsForm;
