import * as React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import CustomerOrderTable from '../_components/table';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Ongoing Customer Orders</CardTitle>
        <CardDescription>Manage all your orders.</CardDescription>
      </CardHeader>

      <CardContent>
        <CustomerOrderTable type='Ongoing' />
      </CardContent>

      <CardFooter>
        <Link href='/request' className='ml-auto'>
          <Button variant='outline'>Add Order</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
