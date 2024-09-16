import * as React from 'react';
import * as yup from 'yup';

import OutletEditForm from '../../_components/edit';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    outlet_id: string;
  };
}

export default async function Page({ params, ...props }: PageProps): Promise<React.JSX.Element> {
  try {
    const { outlet_id } = await yup
      .object({
        outlet_id: yup.string().required(),
      })
      .validate(params);

    return (
      <>
        <div className='flex flex-col items-start space-y-2'>
          <h2 className='text-4xl font-bold'>Outlet Details</h2>
          <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
            Managing a small business today is already tough. Avoid further complications by ditching outdated.
          </p>
        </div>

        <OutletEditForm outlet_id={outlet_id} />
      </>
    );
  } catch (error) {
    redirect('/dashboard/outlets');
  }
}
