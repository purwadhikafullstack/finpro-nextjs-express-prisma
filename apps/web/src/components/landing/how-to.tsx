'use client';

import * as React from 'react';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HowToProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const HowTo: React.FC<HowToProps> = ({ ...props }) => {
  const [selected, setSelected] = React.useState(0);

  const steps = [
    {
      image: '/how-to/step1.jpg',
      title: 'Select Services and Schedule',
      description:
        'Our priority is to make it easy for you to access to our services. Schedule for service, pick-up and delivery anytime, anywhere! ',
    },
    {
      image: '/how-to/step2.jpg',
      title: 'Prepare for Pick-up',
      description:
        'Make sure that the clothes that you want to do laundry are collected in one container at the time of pickup by our courier. That will help your clothes not to be scattered and left behind at the time of pickup.',
    },
    {
      image: '/how-to/step3.jpg',
      title: 'Detailed Itemization and Invoice',
      description:
        'We will immediately process your order and provide invoice via WhatApp service. You can confirm and make Payment via M-Banking, Qris, Virtual Account, and E-Wallet',
    },
    {
      image: '/how-to/step4.jpg',
      title: 'Freshly Cleaned Delivery',
      description:
        'We will make the delivery according to the schedule you requested! No need to worry about being late, we guarantee punctuality of delivery. You can enjoy your perfectly clean clothes the way you want!',
    },
  ];

  return (
    <div className='py-20 text-white bg-primary dark:bg-muted' {...props}>
      <div className='container'>
        <div className='flex flex-col items-center space-y-2'>
          <h2 className='text-4xl font-bold'>How it works?</h2>
          <p className='leading-relaxed tracking-tight text-left text-muted'>
            Book Your Laundry Delivery in 4 Simple Steps, and we will handle the rest.
          </p>
        </div>

        <div className='grid items-center w-full gap-6 mt-14 lg:grid-cols-2'>
          <div className='flex flex-col space-y-2'>
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => setSelected(index)}
                className={cn(
                  'flex flex-col space-y-2 p-8 rounded-lg group cursor-pointer hover:bg-background hover:text-foreground',
                  index === selected && 'bg-background text-foreground'
                )}>
                <span
                  className={cn(
                    'size-8 rounded-full flex items-center justify-center font-bold bg-background text-foreground group-hover:bg-primary group-hover:text-white',
                    index === selected && 'bg-primary text-white'
                  )}>
                  {index + 1}
                </span>
                <h3 className='font-bold'>{step.title}</h3>
                <p className='line-clamp-2 opacity-70'>{step.description}</p>
              </div>
            ))}
          </div>

          <Image
            src={steps[selected].image}
            alt='Logo'
            width={600}
            height={600}
            className='object-cover w-full h-full rounded-md'
          />
        </div>
      </div>
    </div>
  );
};

export default HowTo;
