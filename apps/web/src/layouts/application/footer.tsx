import AppIcon from '@/components/app-icon';
import Link from 'next/link';
import { NavigationItem } from '@/types/navigation';
import { PROJECT_NAME } from '@/lib/constant';

interface FooterProps {
  menus: NavigationItem[];
}

const Footer: React.FC<FooterProps> = ({ menus }) => {
  return (
    <div className='w-full py-20 lg:py-40 bg-foreground text-background'>
      <div className='container mx-auto'>
        <div className='grid lg:grid-cols-2 gap-10 items-center'>
          <div className='flex gap-8 flex-col items-start'>
            <div className='flex gap-2 flex-col'>
              <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
                <AppIcon className='h-6 w-6' />
                <span>{PROJECT_NAME}</span>
              </Link>
              <p className='text-lg max-w-lg leading-relaxed tracking-tight text-background/75 text-left'>
                Managing a small business today is already tough.
              </p>
            </div>
            <div className='flex gap-20 flex-row'>
              <div className='flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left'>
                <p>1 Tailwind Way</p>
                <p>Menlo Park</p>
                <p>CA 94025</p>
              </div>
              <div className='flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left'>
                <Link href='/'>Terms of service</Link>
                <Link href='/'>Privacy Policy</Link>
              </div>
            </div>
          </div>
          <div className='grid lg:grid-cols-3 gap-10 items-start'>
            {menus.map((item) => (
              <div key={item.title} className='flex text-base gap-1 flex-col items-start'>
                <div className='flex flex-col gap-2'>
                  <p>{item.title}</p>
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link key={subItem.title} href={subItem.href} className='flex justify-between items-center'>
                        <span className='text-background/75'>{subItem.title}</span>
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
