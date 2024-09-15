import * as React from 'react';

import { redirect } from 'next/navigation';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  redirect('/orders/all');
}
