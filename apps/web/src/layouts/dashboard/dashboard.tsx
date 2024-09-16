import Header from '@/layouts/dashboard/header';
import Sidebar from '@/layouts/dashboard/sidebar/sidebar';

interface DashboardProps extends React.PropsWithChildren {
  //
}

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  return (
    <>
      <Sidebar className='w-[300px] h-screen hidden lg:block fixed' />
      <div className='lg:ml-[300px] relative'>
        <Header className='sticky top-0 z-10' />
        <main className='container flex flex-col flex-1 gap-8 py-8'>{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
