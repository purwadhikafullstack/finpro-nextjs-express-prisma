import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import CustomerOrderTable from '../_components/table';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    status: string;
  };
}

export default async function Page({ params, ...props }: PageProps): Promise<React.JSX.Element> {
  try {
    const { status } = await yup
      .object({
        status: yup
          .string()
          .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
          .oneOf(['All', 'Ongoing', 'Completed'])
          .required(),
      })
      .validate(params);

    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>{status} Customer Orders</CardTitle>
          <CardDescription>Manage all your orders.</CardDescription>
        </CardHeader>

        <CardContent>
          <CustomerOrderTable type={status} />
        </CardContent>

        <CardFooter>
          <Link href='/request' className='ml-auto'>
            <Button variant='outline'>Add Orders</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  } catch (error) {
    return redirect('/orders');
  }
}
