import * as React from 'react';
import * as yup from 'yup';

import OrderDetail from './_components/detail';
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

    return <OrderDetail order_id={order_id} />;
  } catch (error) {
    redirect('/dashboard/orders');
  }
}
