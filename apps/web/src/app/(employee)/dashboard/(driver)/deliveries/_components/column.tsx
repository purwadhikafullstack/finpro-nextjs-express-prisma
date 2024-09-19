'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTableColumnHeader from '@/components/table/header';
import { Delivery } from '@/types/delivery';
import { MoreHorizontal } from 'lucide-react';
import { Outlet } from '@/types/outlet';
import { ProgressType } from '@/types/shared';
import axios from '@/lib/axios';
import useConfirm from '@/hooks/use-confirm';
import { useSWRConfig } from 'swr';
import { useToast } from '@/hooks/use-toast';

const columns: ColumnDef<
  Delivery & {
    Outlet: Outlet;
  }
>[] = [
  {
    accessorKey: 'delivery_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Delivery ID' />;
    },
    cell: ({ row }) => {
      return <span className='block w-32 font-medium uppercase truncate'>{row.original.delivery_id}</span>;
    },
  },
  {
    accessorKey: 'Outlet.name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Outlet Name' />;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Type' />;
    },
    cell: ({ row }) => {
      return <Badge variant='secondary'>{row.original.type}</Badge>;
    },
  },
  {
    accessorKey: 'employee_id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Employee ID' />;
    },
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Progress' />;
    },
    cell: ({ row }) => {
      return <Badge>{row.original.progress}</Badge>;
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Actions' />;
    },
    cell: ({ row }) => {
      return <TableAction row={row} />;
    },
  },
];

interface TableActionProps {
  row: Row<Delivery & { Outlet: Outlet }>;
}

const TableAction: React.FC<TableActionProps> = ({ row }) => {
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const { confirm } = useConfirm();

  const changeProgress = async (progress: ProgressType) => {
    confirm({
      title: 'Update Delivery Progress',
      description: 'Are you sure you want to update this delivery progress?',
    })
      .then(async () => {
        try {
          await axios.put('/deliveries/' + row.original.delivery_id, { progress });
          toast({
            title: 'Delivery progress updated',
            description: 'Your delivery progress has been updated successfully',
          });
          mutate((key) => Array.isArray(key) && key.includes('/deliveries'));
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to change progress',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='w-8 h-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Delivery</DropdownMenuItem>
        {row.original.progress === 'Pending' && (
          <DropdownMenuItem onClick={() => changeProgress('Ongoing')}>Start Delivery</DropdownMenuItem>
        )}
        {row.original.progress === 'Ongoing' && (
          <DropdownMenuItem onClick={() => changeProgress('Completed')}>Complete Delivery</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default columns;
