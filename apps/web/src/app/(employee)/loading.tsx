import * as React from 'react';

import FullscreenLoader from '@/components/loader/fullscreen';

export default async function Loading(): Promise<React.JSX.Element> {
  return <FullscreenLoader />;
}
