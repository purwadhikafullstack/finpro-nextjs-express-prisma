import * as React from 'react';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GoogleButtonProps {
  //
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ ...props }) => {
  return (
    <Link href={process.env.NEXT_PUBLIC_GOOGLE_URL as string}>
      <Button variant='outline' className='w-full'>
        Sing In with Google
      </Button>
    </Link>
  );
};

export default GoogleButton;
