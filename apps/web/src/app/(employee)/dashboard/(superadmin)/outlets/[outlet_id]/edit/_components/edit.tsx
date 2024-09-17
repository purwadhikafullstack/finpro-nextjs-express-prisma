'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmployeeForm } from '../../../_components/select';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Location } from '@/types/location';
import { MapLoader } from '@/components/loader/map';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import dynamic from 'next/dynamic';
import useConfirm from '@/hooks/use-confirm';
import { useForm } from 'react-hook-form';
import { useOutletDetail } from '@/hooks/use-outlet-detail';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface OutletEditProps {
  outlet_id: string;
}

const outletSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

const OutletEditForm: React.FC<OutletEditProps> = ({ outlet_id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const [location, setLocation] = React.useState<Location | null>(null);
  const [employees, setEmployees] = React.useState<EmployeeForm[]>([]);
  const { data, error, isLoading, mutate } = useOutletDetail(outlet_id);

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
    },
  });

  React.useEffect(() => {
    if (data) {
      form.setValue('name', data.data.name);
      form.setValue('description', data.data.description);
      form.setValue('address', data.data.address);
      setLocation({
        latitude: data.data.latitude,
        longitude: data.data.longitude,
      });
      setEmployees(data.data.Employee.map((employee) => ({ ...(employee.User as EmployeeForm) })));
    }
  }, [data, form]);

  React.useEffect(() => {
    if (location) {
      form.setValue('latitude', location.latitude);
      form.setValue('longitude', location.longitude);
    }
  }, [form, location]);

  const onSubmit = async (formData: yup.InferType<typeof outletSchema>) => {
    confirm({
      title: 'Update Outlet',
      description: 'Are you sure you want to update this outlet? make sure the details are correct.',
    })
      .then(async () => {
        try {
          await axios.put('/outlets/' + outlet_id, formData);
          toast({
            title: 'Outlet updated',
            description: 'Your outlet has been updated successfully',
          });
          mutate();
          router.push('/dashboard/outlets');
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to create outlet',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load outlet data, retrying...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid items-start gap-8 lg:grid-cols-5'>
        <div className='flex flex-col gap-8 lg:col-span-3'>
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
                      {data.data.Employee.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className='h-20 text-center'>
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
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
        </div>

        <div className='flex flex-col gap-8 lg:col-span-2'>
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
              <div className='flex items-center justify-end space-x-4'>
                <Link href='/dashboard/outlets'>
                  <Button variant='outline'>Cancel</Button>
                </Link>
                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
                  Update Outlet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default OutletEditForm;