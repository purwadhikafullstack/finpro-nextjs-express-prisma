'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import useConfirm from '@/hooks/use-confirm';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from '@/components/loader/loader';
import { useProfile } from '@/hooks/use-profile';

interface ChangeEmailFormProps {
  //
}

const passwordSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ ...props }) => {
  const { changeEmail } = useAuth();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { data, error, isLoading, mutate } = useProfile();

  const form = useForm<yup.InferType<typeof passwordSchema>>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (data) {
      form.setValue('email', data.data.email);
    }
  }, [data, form]);

  const onSubmit = async (formData: yup.InferType<typeof passwordSchema>) => {
    confirm({
      title: 'Change Email',
      description: 'Are you sure you want to change your email? you will need to verify your new email.',
    })
      .then(async () => {
        try {
          await changeEmail(formData);
          toast({
            title: 'Email changed',
            description: 'Your email has been changed successfully',
          });
          mutate();
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Password change failed',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  if (isLoading) return <Loader />;
  if (error || !data) return <div>Failed to load profile</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='enter your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-start'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
            Update Email
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeEmailForm;
