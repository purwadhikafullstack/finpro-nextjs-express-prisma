'use client';

import * as React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';
import { useDebounceValue } from 'usehooks-ts';
import { useToast } from '@/hooks/use-toast';

const roleOptions = ['Driver', 'OutletAdmin', 'WashingWorker', 'IroningWorker', 'PackingWorker'] as const;

export type EmployeeForm = {
  user_id: string;
  fullname: string;
  email: string;
  role: (typeof roleOptions)[number];
};

interface UserSelectProps {
  selected: EmployeeForm[];
  setSelected: React.Dispatch<React.SetStateAction<EmployeeForm[]>>;
}

const EmployeeSelectField = React.forwardRef<HTMLDivElement, UserSelectProps>(({ selected, setSelected }, ref) => {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState('');
  const [users, setUsers] = React.useState<EmployeeForm[]>([]);
  const [debounced] = useDebounceValue(filter, 300);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get('/users/search?query=' + debounced);
        setUsers(data.data);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Failed to load users',
          description: error.message,
        });
      }
    };

    getUsers();
  }, [debounced]);

  const getPlaceholder = (user: (typeof users)[0]) => {
    const find = selected.find((u) => u.user_id === user.user_id);
    return find ? find.role : user.role;
  };

  return (
    <>
      <Input placeholder='Search name or email' value={filter} onChange={(event) => setFilter(event.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/3'>Fullname</TableHead>
            <TableHead className='w-1/3'>Email</TableHead>
            <TableHead className='text-right'>Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell className='font-medium'>{user.fullname}</TableCell>
              <TableCell className='font-medium'>{user.email}</TableCell>
              <TableCell>
                <Select
                  onValueChange={(value: (typeof roleOptions)[number] | 'Customer') => {
                    if (value === 'Customer') {
                      setSelected(selected.filter((item) => item.user_id !== user.user_id));
                    } else {
                      const find = selected.find((item) => item.user_id === user.user_id);
                      if (find) setSelected(selected.filter((item) => item.user_id !== user.user_id));
                      setSelected((s) => [
                        ...s,
                        {
                          user_id: user.user_id,
                          fullname: user.fullname,
                          email: user.email,
                          role: value,
                        },
                      ]);
                    }
                  }}>
                  <SelectTrigger id='status' aria-label='Select status'>
                    <SelectValue placeholder={getPlaceholder(user)} />
                  </SelectTrigger>

                  <SelectContent>
                    {[...roleOptions, 'Customer'].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
});

export default EmployeeSelectField;
