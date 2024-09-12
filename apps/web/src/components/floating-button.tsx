import * as React from 'react';

import { Button } from './ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingButtonProps {
  className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ className, ...props }) => {
  return (
    <Link
      href='/orders/create'
      className={cn('fixed bottom-0 right-0 z-50 flex m-8 items-center justify-center', className)}>
      <Button className='py-3' variant='destructive'>
        <ShoppingBag className='inline-block size-6' />
        <span className='ml-2 text-sm'>Place Order</span>
      </Button>
    </Link>
  );
};

export default FloatingButton;
