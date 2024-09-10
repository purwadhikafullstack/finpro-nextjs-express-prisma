'use client';

import * as React from 'react';

interface TestimonyProps {
  //
}

const Testimony: React.FC<TestimonyProps> = ({ ...props }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const left = React.useRef<HTMLUListElement>(null);
  const right = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (container.current && left.current && right.current) {
      const contentLeft = Array.from(left.current.children);
      const contentRight = Array.from(right.current.children);

      contentLeft.forEach((item, index) => {
        const duplicate = item.cloneNode(true) as HTMLLIElement;
        if (left.current) {
          left.current.appendChild(duplicate);
        }
      });

      contentRight.forEach((item, index) => {
        const duplicate = item.cloneNode(true) as HTMLLIElement;
        if (right.current) {
          right.current.appendChild(duplicate);
        }
      });
    }
  }

  return (
    <div className='py-20' {...props}>
      <div className='flex flex-col space-y-2 items-center'>
        <h2 className='font-bold text-4xl'>They love LaundryXpert, Now your turn 😍</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          Our customers trust LaundryXpert for exceptional service and convenience
        </p>
      </div>

      <div ref={container} className='mt-14 flex flex-col space-y-6 overflow-hidden relative'>
        <ul ref={left} className='animate-left flex-nowrap shrink-0 flex space-x-6 items-center'>
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className='basis-2/3 lg:basis-1/4 p-8 bg-accent rounded-lg flex-none'>
              <div className='flex space-x-4'>
                <div className='rounded-full size-10 flex-none font-medium bg-white flex items-center justify-center'>
                  A
                </div>
                <div className='flex flex-col space-y-2'>
                  <blockquote className='text-muted-foreground text-sm'>
                    “LaundryXpert exceeded my expectations. My clothes are always perfectly cleaned and handled with
                    care. 💎“
                  </blockquote>
                  <span className='text-foreground text-sm font-medium'>John Doe</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul ref={right} className='animate-right flex-nowrap shrink-0 flex space-x-6 items-center'>
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className='basis-2/3 lg:basis-1/4 p-8 bg-accent rounded-lg flex-none'>
              <div className='flex space-x-4'>
                <div className='rounded-full size-10 flex-none font-medium bg-white flex items-center justify-center'>
                  B
                </div>
                <div className='flex flex-col space-y-2'>
                  <blockquote className='text-muted-foreground text-sm'>
                    “LaundryXpert exceeded my expectations. My clothes are always perfectly cleaned and handled with
                    care. 💎“
                  </blockquote>
                  <span className='text-foreground text-sm font-medium'>John Doe</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimony;
