import * as React from 'react';

import Loader from '@/components/loader/loader';

export default async function Loading(): Promise<React.JSX.Element> {
  return <Loader />;
}
