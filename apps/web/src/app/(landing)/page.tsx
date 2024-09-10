import * as React from 'react';

import Feature from '@/components/landing/feature';
import Hero from '@/components/landing/hero';
import HowTo from '@/components/landing/how-to';
import OutletTable from '../(employee)/dashboard/outlets/_components/table';
import Showcase from '@/components/landing/showcase';
import Testimony from '@/components/landing/testimony';
import fs from 'fs';

interface PageProps {
  //
}

export default async function Page({ ...props }: PageProps): Promise<React.JSX.Element> {
  const images = fs.readdirSync('./public/logos');

  return (
    <div className='flex flex-col w-full gap-32 py-20'>
      <Hero data-aos='fade-up' data-aos-delay={100} className='h-[50vh] container' />
      <Showcase data-aos='fade-up' data-aos-delay={200} images={images} className='mb-20 container' />
      <Feature data-aos='fade-up' data-aos-delay={300} className='container' />
      <HowTo data-aos='fade-up' data-aos-delay={400} />
      <Testimony data-aos='fade-up' data-aos-delay={500} />
    </div>
  );
}
