import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import EditLaundryItemModal from './edit-modal';
import Image from 'next/image';
import { LaundryItem } from '@/types/laundry-item';
import { MoreHorizontal } from 'lucide-react';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import useConfirm from '@/hooks/use-confirm';
import { useLaundryItems } from '@/hooks/use-laundry-items';
import { useToast } from '@/hooks/use-toast';

interface LaundryItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: LaundryItem;
  withAction?: boolean;
}

const LaundryItemCard: React.FC<LaundryItemCardProps> = ({ item, withAction = false, ...props }) => {
  return (
    <div className='relative overflow-hidden border rounded-lg cursor-pointer group bg-card' {...props}>
      {withAction && <Action item={item} className='absolute bottom-0 right-0 m-2' />}
      {item.icon_url ? (
        <Image
          src={item.icon_url}
          alt={item.name}
          width={200}
          height={200}
          className='object-cover object-center w-full aspect-square'
        />
      ) : (
        <div className='w-full aspect-square bg-muted'></div>
      )}
      <h3 className='p-4 font-medium'>{item.name}</h3>
    </div>
  );
};

interface ActionProps {
  item: LaundryItem;
  className?: string;
}

const Action: React.FC<ActionProps> = ({ item, className }) => {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { mutate } = useLaundryItems();

  const handleDelete = async (item: LaundryItem) => {
    confirm({
      variant: 'destructive',
      title: 'Delete Laundry Item',
      description: `Are you sure you want to delete this laundry item? make sure the details are correct, this action
      will also delete all order items associated with this laundry item.`,
    }).then(async () => {
      try {
        await axios.delete('/laundry-items/' + item.laundry_item_id);
        toast({
          title: 'Laundry Item deleted',
          description: 'Your laundry item has been deleted successfully',
        });
        mutate();
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Failed to delete laundry item',
          description: error.message,
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className={cn('w-8 h-8 p-0', className)}>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditLaundryItemModal item={item} />
        <DropdownMenuItem onClick={() => handleDelete(item)}>Delete Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LaundryItemCard;
