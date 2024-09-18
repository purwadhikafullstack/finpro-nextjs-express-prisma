import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import OrderPayment from '../_components/payment';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    order_id: string;
  };
}

export default async function Page({ params, ...props }: PageProps): Promise<React.JSX.Element> {
  try {
    const { order_id } = await yup
      .object({
        order_id: yup.string().required(),
      })
      .validate(params);

    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Order Payment</CardTitle>
          <CardDescription>
            Complete the payment for this order, you can choose to pay manually or other available payment methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderPayment order_id={order_id} />
        </CardContent>
      </Card>
    );
  } catch (error) {
    redirect('/dashboard/orders');
  }
}
