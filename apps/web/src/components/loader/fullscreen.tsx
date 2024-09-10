import * as React from 'react';

import { Loader2 } from 'lucide-react';

interface LoaderProps {
  //
}

const FullscreenLoader: React.FC<LoaderProps> = ({ ...props }) => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Loader2 className='size-10 animate-spin text-primary' />
    </div>
  );
};

export default FullscreenLoader;
