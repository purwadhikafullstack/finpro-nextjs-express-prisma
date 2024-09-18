'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import { Loader2 } from 'lucide-react';
import { PaymentMethod } from '@/types/payment';
import axios from '@/lib/axios';
import { formatCurrency } from '@/lib/utils';
import useConfirm from '@/hooks/use-confirm';
import { useForm } from 'react-hook-form';
import { useOrderDetail } from '@/hooks/use-order-detail';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface OrderPaymentProps {
  order_id: string;
}

const methods: PaymentMethod[] = ['Manual', 'PaymentGateway'];

const paymentSchema = yup.object({
  method: yup.string().oneOf(methods).required(),
  receipt_url: yup
    .string()
    .url()
    .when('method', {
      is: (method: PaymentMethod) => method === 'Manual',
      then: (schema: yup.Schema) => schema.required(),
      otherwise: (schema: yup.Schema) => schema.notRequired(),
    }),
});

const OrderPayment: React.FC<OrderPaymentProps> = ({ order_id, ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { data, error, isLoading } = useOrderDetail(order_id);

  const form = useForm<yup.InferType<typeof paymentSchema>>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      method: 'Manual',
      receipt_url: '',
    },
  });

  React.useEffect(() => {
    if (data) {
      if (!data.data.is_payable) {
        toast({
          title: 'You can not pay this order',
          description: 'You can not pay this order currently, please check your order progress',
        });
        router.back();
        return;
      }

      if (data.data.Payment && data.data.Payment.status === 'Paid') {
        toast({
          title: 'Order has been paid',
          description: 'Your order has been paid successfully',
        });
        router.back();
        return;
      }
    }
  }, [data]);

  const onSubmit = async (formData: yup.InferType<typeof paymentSchema>) => {
    confirm({
      title: 'Pay Order',
      description: 'Are you sure you want to pay this order? make sure the details are correct.',
    })
      .then(async () => {
        try {
          const { data } = await axios.post('/profile/orders/' + order_id + '/payment', formData);
          if (data.data.method === 'Manual') {
            toast({
              title: 'Order payment updated',
              description: 'Your order payment has been updated successfully',
            });
            router.push('/orders');
            return;
          } else if (data.data.method === 'PaymentGateway') {
            toast({
              title: 'Order payment created',
              description: 'Your order payment has been created successfully',
            });
            window.location.href = data.data.payment_url;
          }
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to pay order',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  const method = form.watch('method');

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load order data, retrying...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <div className='grid gap-4'>
          <FormItem>
            <FormLabel>Amount to pay</FormLabel>
            <div className='border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Laundry Fee</TableCell>
                    <TableCell className='text-right'>{formatCurrency(data.data.laundry_fee)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Delivery Fee</TableCell>
                    <TableCell className='text-right'>{formatCurrency(data.data.delivery_fee)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name='method'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a payment method' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {methods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {method === 'Manual' && (
            <FormField
              control={form.control}
              name='receipt_url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Url</FormLabel>
                  <ImageUpload
                    imageWidth={720}
                    imageHeight={720}
                    asset_folder={'receipt'}
                    src={form.watch('receipt_url')}
                    eager='w_500,h_500,c_fill'
                    onChangeImage={(original, eager) => form.setValue('receipt_url', eager ? eager : original)}
                    className='overflow-hidden border rounded-lg aspect-video bg-accent'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className='flex justify-start'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
            Pay Order
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default OrderPayment;
