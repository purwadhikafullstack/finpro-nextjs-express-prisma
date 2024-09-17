import { FEATURES_LIST } from '@/lib/constant';
import Image from 'next/image';

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const Feature: React.FC<FeatureProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex flex-col items-center space-y-2'>
        <h2 className='text-4xl font-bold'>Wha&apos;s Included in the Service?</h2>
        <p className='leading-relaxed tracking-tight text-left text-muted-foreground'>
          Managing a small business today is already tough. Avoid further complications by ditching outdated.
        </p>
      </div>

      <div className='grid gap-8 mx-auto mt-14 md:grid-cols-3'>
        {FEATURES_LIST.map((feature, idx) => {
          return (
            <div className='flex flex-col p-6 space-y-6 border rounded-lg bg-muted md:block' key={idx}>
              <div>
                <h3 className='text-lg font-medium md:mb-2'>{feature.title}</h3>
                <p className='text-muted-foreground line-clamp-3'>{feature.description}</p>
              </div>
              <Image src={feature.image} alt='Logo' width={300} height={300} className='w-full rounded-md' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
