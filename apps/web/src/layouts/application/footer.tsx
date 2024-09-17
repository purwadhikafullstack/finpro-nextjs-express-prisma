import AppIcon from '@/components/app-icon';
import Link from 'next/link';
import { NavigationItem } from '@/types/navigation';
import { PROJECT_NAME } from '@/lib/constant';

interface FooterProps {
  menus: NavigationItem[];
}

const Footer: React.FC<FooterProps> = ({ menus }) => {
  return (
    <div className='w-full py-20 lg:py-40 bg-muted'>
      <div className='container mx-auto'>
        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div className='flex flex-col items-start gap-8'>
            <div className='flex flex-col gap-2'>
              <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
                <AppIcon className='w-6 h-6' />
                <span>{PROJECT_NAME}</span>
              </Link>
              <p className='max-w-lg text-lg leading-relaxed tracking-tight text-left text-muted-foreground'>
                Managing a small business today is already tough.
              </p>
            </div>
            <div className='flex flex-row gap-20'>
              <div className='flex flex-col max-w-lg text-sm leading-relaxed tracking-tight text-left text-muted-foreground'>
                <p>1 Tailwind Way</p>
                <p>Menlo Park</p>
                <p>CA 94025</p>
              </div>
              <div className='flex flex-col max-w-lg text-sm leading-relaxed tracking-tight text-left text-muted-foreground'>
                <Link href='/'>Terms of service</Link>
                <Link href='/'>Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className='grid items-start gap-10 lg:grid-cols-3'>
            {menus.map((item) => (
              <div key={item.title} className='flex flex-col items-start gap-1 text-base'>
                <div className='flex flex-col gap-2'>
                  <p>{item.title}</p>
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link key={subItem.title} href={subItem.href} className='flex items-center justify-between'>
                        <span className='text-muted-foreground'>{subItem.title}</span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
