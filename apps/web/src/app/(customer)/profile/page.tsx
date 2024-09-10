import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import OutletTable from '@/app/(employee)/dashboard/outlets/_components/table';
import ProfileForm from './_components/form';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>User Profile</CardTitle>
        <CardDescription>
          Manage your profile and addresses, this information will be used to deliver your orders.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
