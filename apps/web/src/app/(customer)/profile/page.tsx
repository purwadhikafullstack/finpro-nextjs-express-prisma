import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import EditProfileForm from './_components/edit';
import ChangePasswordForm from './_components/change-password';
import ChangeEmailForm from './_components/change-email';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='grid gap-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>User Profile</CardTitle>
          <CardDescription>
            Manage your profile and addresses, this information will be used to deliver your orders.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EditProfileForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Change Password</CardTitle>
          <CardDescription>Change your password to access your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Change Email</CardTitle>
          <CardDescription>Change your email to access your account.</CardDescription>
        </CardHeader>

        <CardContent>
          <ChangeEmailForm />
        </CardContent>
      </Card>
    </div>
  );
}
