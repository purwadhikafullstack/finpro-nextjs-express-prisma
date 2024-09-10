import { FEATURES_LIST } from '@/lib/constant';
import Image from 'next/image';

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const Feature: React.FC<FeatureProps> = ({ ...props }) => {
  return (
    <div {...props}>
      <div className='flex flex-col space-y-2 items-center'>
        <h2 className='font-bold text-4xl'>Wha&apos;s Included in the Service?</h2>
        <p className='leading-relaxed tracking-tight text-muted-foreground text-left'>
          Managing a small business today is already tough. Avoid further complications by ditching outdated.
        </p>
      </div>

      <div className='mx-auto mt-14 grid gap-8 md:grid-cols-3'>
        {FEATURES_LIST.map((feature, idx) => {
          return (
            <div className='flex flex-col rounded-lg md:block p-6 border space-y-6 bg-white' key={idx}>
              <div>
                <h3 className='font-medium md:mb-2 text-lg'>{feature.title}</h3>
                <p className='text-sm text-muted-foreground line-clamp-3'>{feature.description}</p>
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
