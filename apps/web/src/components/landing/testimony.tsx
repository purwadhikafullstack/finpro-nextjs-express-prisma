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
      <div className='container flex flex-col items-center space-y-2'>
        <h2 className='text-4xl font-bold'>They love LaundryXpert, Now your turn 😍</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          Our customers trust LaundryXpert for exceptional service and convenience
        </p>
      </div>

      <div ref={container} className='relative flex flex-col space-y-6 overflow-hidden mt-14'>
        <ul ref={left} className='flex items-center space-x-6 animate-left flex-nowrap shrink-0'>
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className='flex-none p-8 rounded-lg basis-2/3 lg:basis-1/4 bg-muted'>
              <div className='flex space-x-4'>
                <div className='flex items-center justify-center flex-none font-medium rounded-full bg-card size-10'>
                  A
                </div>
                <div className='flex flex-col space-y-2'>
                  <blockquote className='text-sm text-muted-foreground'>
                    LaundryXpert exceeded my expectations. My clothes are always perfectly cleaned and handled with
                    care. ⭐
                  </blockquote>
                  <span className='text-sm font-medium text-foreground'>John Doe</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul ref={right} className='flex items-center space-x-6 animate-right flex-nowrap shrink-0'>
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index} className='flex-none p-8 rounded-lg basis-2/3 lg:basis-1/4 bg-muted'>
              <div className='flex space-x-4'>
                <div className='flex items-center justify-center flex-none font-medium rounded-full bg-card size-10'>
                  B
                </div>
                <div className='flex flex-col space-y-2'>
                  <blockquote className='text-sm text-muted-foreground'>
                    LaundryXpert exceeded my expectations. My clothes are always perfectly cleaned and handled with
                    care. 😍
                  </blockquote>
                  <span className='text-sm font-medium text-foreground'>John Doe</span>
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
