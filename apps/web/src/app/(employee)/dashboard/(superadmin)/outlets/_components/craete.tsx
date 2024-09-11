'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserSelect, { EmployeeForm } from './select';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Location } from '@/types/location';
import { MapLoader } from '@/components/loader/map';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useLocation } from '@/hooks/use-location';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface OutletCreateProps {
  //
}
const Role = ['Customer', 'Driver', 'OutletAdmin', 'WashingWorker', 'IroningWorker', 'PackingWorker'] as const;

const outletSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  employees: yup
    .array(
      yup.object({
        user_id: yup.string().required(),
        email: yup.string().required(),
        fullname: yup.string().required(),
        role: yup.string().oneOf(Object.values(Role)).required().defined(),
      })
    )
    .required(),
});

const OutletCreate: React.FC<OutletCreateProps> = ({ ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useLocation();
  const [location, setLocation] = React.useState<Location | null>(null);
  const [employees, setEmployees] = React.useState<EmployeeForm[]>([]);

  const Map = React.useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <MapLoader />,
        ssr: false,
      }),
    []
  );

  const form = useForm<yup.InferType<typeof outletSchema>>({
    resolver: yupResolver(outletSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      latitude: 0,
      longitude: 0,
      employees: [],
    },
  });

  React.useEffect(() => {
    if (state) setLocation(state);
  }, [state, setLocation]);

  React.useEffect(() => {
    if (location) {
      form.setValue('latitude', location.latitude);
      form.setValue('longitude', location.longitude);
    }
  }, [form, location]);

  React.useEffect(() => {
    if (employees.length > 0) {
      form.setValue('employees', employees);
    }
  }, [form, employees]);

  const onSubmit = async (formData: yup.InferType<typeof outletSchema>) => {
    try {
      await axios.post('/outlets', formData);
      toast({
        title: 'Outlet created',
        description: 'Your outlet has been created successfully',
      });
      router.push('/dashboard/outlets');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to create outlet',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid lg:grid-cols-5 gap-8 items-start'>
        <div className='flex flex-col lg:col-span-3 gap-8'>
          <Card>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Outlet Detail</CardTitle>
              <CardDescription>Make sure to add all the details of your outlet.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='enter outlet name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder='enter outlet description' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormLabel>Employees</FormLabel>
                <div className='border rounded-md'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-1/3'>Fullname</TableHead>
                        <TableHead className='w-1/3'>Email</TableHead>
                        <TableHead className='text-right'>Select</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee, idx) => (
                        <TableRow key={idx}>
                          <TableCell className='font-medium'>{employee.fullname}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell className='text-end'>
                            <Badge variant='secondary'>{employee.role}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Search Users</CardTitle>
              <CardDescription>List of available users to select, you can search by name or email.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='employees'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employees</FormLabel>
                      <FormControl>
                        <UserSelect {...field} selected={employees} setSelected={setEmployees} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex flex-col lg:col-span-2 gap-8'>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Outlet Location</CardTitle>
              <CardDescription>This information will be used to locate your outlet.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder='enter outlet address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='latitude'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input placeholder='enter outlet latitude' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='longitude'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input placeholder='enter outlet longitude' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel>Location</FormLabel>
                  {location ? (
                    <Map location={location} setLocation={setLocation} className='aspect-square' />
                  ) : (
                    <MapLoader />
                  )}
                </FormItem>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-xl font-bold'>Save Data</CardTitle>
              <CardDescription>Save outlet data and assign employees to it.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex justify-end space-x-4 items-center'>
                <Link href='/dashboard/outlets'>
                  <Button variant='outline'>Cancel</Button>
                </Link>
                <Button type='submit'>Save Outlet</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default OutletCreate;
