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
      title: '04. Freshly Cleaned Delivery',
      description:
        'We will make the delivery according to the schedule you requested! No need to worry about being late, we guarantee punctuality of delivery. You can enjoy your perfectly clean clothes the way you want!',
    },
  ];

  return (
    <div className='bg-primary text-white py-20' {...props}>
      <div className='container'>
        <div className='flex flex-col space-y-2 items-center'>
          <h2 className='font-bold text-4xl'>How it works?</h2>
          <p className='leading-relaxed tracking-tight text-muted text-left'>
            Book Your Laundry Delivery in 4 Simple Steps, and we will handle the rest.
          </p>
        </div>

        <div className='w-full mt-14 grid lg:grid-cols-2 gap-6 items-center'>
          <div className='flex flex-col space-y-2'>
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  'group rounded-lg p-6 w-full flex flex-col space-y-2 hover:bg-white hover:text-foreground cursor-pointer',
                  index === selected && 'bg-white text-foreground'
                )}
                onClick={() => setSelected(index)}>
                <span
                  className={cn(
                    'bg-white group-hover:bg-white aspect-square rounded-full size-8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white font-medium',
                    index === selected && 'bg-primary text-white'
                  )}>
                  {index + 1}
                </span>
                <h3 className='font-bold'>{step.title}</h3>
                <p
                  className={cn(
                    'text-muted group-hover:text-muted-foreground line-clamp-2',
                    index === selected && 'text-muted-foreground'
                  )}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <Image
            src={steps[selected].image}
            alt='Logo'
            width={600}
            height={600}
            className='w-full rounded-md h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default HowTo;
