import * as React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import AddressTable from './_components/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import OutletTable from '@/app/(employee)/dashboard/outlets/_components/table';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>User Addresses</CardTitle>
        <CardDescription>Manage your addresses, this information will be used to deliver your orders.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddressTable />
      </CardContent>
      <CardFooter>
        <Link href='/profile/addresses/create' className='ml-auto'>
          <Button variant='outline'>Add Address</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
