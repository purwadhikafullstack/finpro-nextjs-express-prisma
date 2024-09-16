import * as React from 'react';
import * as yup from 'yup';

import SetToken from '@/components/set-token';
import { redirect } from 'next/navigation';

interface PageProps {
  searchParams: {
    token: string;
  };
}

export default async function Page({ searchParams, ...props }: PageProps): Promise<React.JSX.Element> {
  try {
    const { token } = await yup
      .object({
        token: yup.string().required(),
      })
      .validate(searchParams);

    return <SetToken token={token} />;
  } catch (error) {
    redirect('/');
  }
}
