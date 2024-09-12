import * as React from 'react';

import RequestOrderForm from '../_components/create';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col space-y-2 items-start'>
        <h2 className='font-bold text-4xl'>Request Order</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          Find our oulet location near you and create a new order.
        </p>
      </div>

      <RequestOrderForm />
    </div>
  );
}
