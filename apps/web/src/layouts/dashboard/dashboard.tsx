import Header from '@/layouts/dashboard/header';
import Sidebar from '@/layouts/dashboard/sidebar/sidebar';

interface DashboardProps extends React.PropsWithChildren {
  //
}

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 container flex flex-col gap-8 py-8'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
