import * as React from 'react';

import RequestOrderForm from './_components/create';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col items-start space-y-2'>
        <h2 className='text-4xl font-bold'>Request Order</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          Find our oulet location near you and create a new order.
        </p>
      </div>

      <RequestOrderForm />
    </div>
  );
}
