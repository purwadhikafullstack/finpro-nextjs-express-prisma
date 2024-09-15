'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateLaundryItemProps {
  //
}

const laundryItemSchema = yup.object({
  name: yup.string().required(),
  icon_url: yup.string().optional(),
});

const CreateLaundryItem: React.FC<CreateLaundryItemProps> = ({ ...props }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<yup.InferType<typeof laundryItemSchema>>({
    resolver: yupResolver(laundryItemSchema),
    defaultValues: {
      name: '',
      icon_url: '',
    },
  });

  const onSubmit = async (formData: yup.InferType<typeof laundryItemSchema>) => {
    try {
      await axios.post('/laundry-items', formData);
      toast({
        title: 'Laundry Item created',
        description: 'Your laundry item has been created successfully',
      });
      router.push('/dashboard/laundry-items');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to create laundry item',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl font-bold'>Create Laundry Item</CardTitle>
            <CardDescription>Make sure to add all the details of your laundry item.</CardDescription>
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
                      <Input placeholder='enter your name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='icon_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Url (wip)</FormLabel>
                    <FormControl>
                      <Input placeholder='enter your icon url' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type='submit' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
              Create Laundry Item
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CreateLaundryItem;
