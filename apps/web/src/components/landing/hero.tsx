'use client';

import * as React from 'react';

import { Badge } from '../ui/badge';
import { Button } from '@/components/ui/button';
import { PROJECT_NAME } from '@/lib/constant';
import { Separator } from '../ui/separator';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const Hero: React.FC<HeroProps> = ({ className, ...props }) => {
  return (
    <div className={cn('w-full flex flex-col space-y-6 justify-center', className)} {...props}>
      <div className='flex flex-col items-center text-center space-y-4'>
        <h1 className='text-5xl lg:text-7xl font-bold'>
          Clean Clothes with <span className='rainbow'>{PROJECT_NAME}</span>
          <br />
          Experience the Difference
        </h1>
        <p className='text-muted-foreground max-w-md'>
          Experience the ease and reliability of LaundryXpert, where quality laundry care meets exceptional service.
        </p>
      </div>

      <div className='flex items-center space-x-4 justify-center'>
        <Button variant='outline'>How it Works</Button>
        <Button variant='default'>Premium Features</Button>
      </div>

      <div className='flex items-center justify-center space-x-4'>
        <div className='flex flex-col items-end space-y-1'>
          <div className='flex text-orange-500'>
            <Star className='size-6 fill-current' />
            <Star className='size-6 fill-current' />
            <Star className='size-6 fill-current' />
            <Star className='size-6 fill-current' />
            <Star className='size-6 fill-current' />
          </div>

          <div className='flex space-x-2 items-center'>
            <span className='font-bold'>4.9</span>
            <span>Ratings</span>
          </div>
        </div>

        <Separator orientation='vertical' />

        <div className='flex flex-col items-start space-y-1'>
          <span className='font-bold'>1+ Million</span>
          <span>Downloads</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
