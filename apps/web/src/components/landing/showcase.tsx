'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

import Image from 'next/image';

interface ShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[];
}

const Showcase: React.FC<ShowcaseProps> = ({ images, ...props }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const urls = [...images, ...images].map((image) => '/logos/' + image);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <Carousel setApi={setApi} className='flex justify-center w-full' {...props}>
      <CarouselContent className='w-full'>
        {urls.map((url, index) => (
          <CarouselItem className='basis-1/3 lg:basis-1/6' key={index}>
            <div className='flex rounded-md bg-muted items-center justify-center p-6'>
              <Image src={url} alt='Logo' width={200} height={200} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Showcase;
