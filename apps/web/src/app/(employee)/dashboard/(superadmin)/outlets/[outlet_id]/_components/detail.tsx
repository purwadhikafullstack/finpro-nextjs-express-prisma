'use client';

import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import DetailList from '@/components/detail-list';
import { useOutletDetail } from '@/hooks/use-outlet-detail';

interface OutletDetailsProps {
  outlet_id: string;
}

const OutletDetails: React.FC<OutletDetailsProps> = ({ outlet_id, ...props }) => {
  const { data, error, isLoading } = useOutletDetail(outlet_id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>failed to load outlet data, retrying...</div>;

  return (
    <div className='grid items-start gap-8 lg:grid-cols-5'>
      <div className='flex flex-col gap-8 lg:col-span-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Outlet Details</CardTitle>
            <CardDescription>Make sure to add all the details of your outlet.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='grid gap-4'>
              <div className='flex flex-col space-y-4 text-sm'>
                <DetailList title='Outlet ID' data={data.data.outlet_id.toUpperCase()} />
                <DetailList title='Name' data={data.data.name} />
                <DetailList title='Description' data={data.data.description} />
                <DetailList title='Address' data={data.data.address} />
                <DetailList title='City' data={data.data.city} />
                <DetailList title='Region' data={data.data.region} />
                <DetailList title='Suburb' data={data.data.suburb} />
                <DetailList title='Zipcode' data={data.data.zipcode} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-8 lg:col-span-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Employee Details</CardTitle>
            <CardDescription>Make sure to add all the details of your outlet.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className='border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
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
                  {data.data.Employee.map((employee, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{employee.User.fullname}</TableCell>
                      <TableCell>{employee.User.email}</TableCell>
                      <TableCell>
                        <Badge>{employee.User.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OutletDetails;
