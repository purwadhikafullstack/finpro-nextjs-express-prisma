interface DetailListProps {
  title: string;
  data: string | undefined;
}

const DetailList: React.FC<DetailListProps> = ({ title, data }) => {
  return (
    <div className='flex flex-col w-full lg:space-x-2 lg:flex-row items-bottom'>
      <span className='flex-none'>{title}</span>
      <div className='hidden w-full border-b border-dotted lg:flex border-muted-foreground'></div>
      <span className='flex-none text-muted-foreground'>{data}</span>
    </div>
  );
};

export default DetailList;
