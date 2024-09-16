import Illustration from '@/components/illustration';
import { Button } from '@/components/ui/button';
import Application from '@/layouts/application/application';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Application>
      <div className='w-full h-[80vh] flex flex-col space-y-4 items-center justify-center text-center'>
        <Illustration className='w-full max-w-2xl' />
        <h1 className='text-6xl font-bold'>Page Not Found</h1>
        <p className='text-muted-foreground'>Oops! The page you are looking for doesn&apos;t exist.</p>
        <Link href='/'>
          <Button>Return Home</Button>
        </Link>
      </div>
    </Application>
  );
}
