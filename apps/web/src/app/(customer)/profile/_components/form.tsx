'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Loader from '@/components/loader/loader';
import { Loader2 } from 'lucide-react';
import { User } from '@/types/user';
import { fetcher } from '@/lib/axios';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface ProfileFormProps {
  //
}

const profileSchema = yup.object({
  fullname: yup.string().required(),
  phone: yup.string().required(),
});

const ProfileForm: React.FC<ProfileFormProps> = ({ ...props }) => {
  const { toast } = useToast();
  const { update } = useAuth();
  const { data, error, isLoading } = useSWR<{ message: string; data: User }>('/profile', fetcher, {
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to load profile',
        description: error.message,
      });
    },
  });

  const form = useForm<yup.InferType<typeof profileSchema>>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullname: '',
      phone: '',
    },
  });

  React.useEffect(() => {
    if (data) {
      form.setValue('fullname', data.data.fullname);
      form.setValue('phone', data.data.phone);
    }
  }, [data, form]);

  const onSubmit = async (formData: yup.InferType<typeof profileSchema>) => {
    try {
      await update(formData);
      toast({
        title: 'Profile saved',
        description: 'Your profile has been saved successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Profile failed',
        description: error.message,
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <div>Failed to load profile</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
        <div className='grid gap-4'>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='enter your email' defaultValue={data.data.email} disabled readOnly />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='enter your full name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='enter your phone' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex justify-start'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
