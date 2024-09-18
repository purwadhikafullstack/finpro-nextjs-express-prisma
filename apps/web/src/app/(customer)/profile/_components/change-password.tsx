'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from '@/lib/axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import useConfirm from '@/hooks/use-confirm';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import PasswordMeter from '@/components/password-meter';
import { useAuth } from '@/hooks/use-auth';

interface ChangePasswordFormProps {
  //
}

const passwordSchema = yup.object({
  password: yup.string().required(),
  new_password: yup
    .string()
    .min(10, 'Password is too short')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required(),
  confirmation: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords do not match')
    .required(),
});

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ ...props }) => {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { changePassword } = useAuth();

  const form = useForm<yup.InferType<typeof passwordSchema>>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: '',
      new_password: '',
      confirmation: '',
    },
  });

  const onSubmit = async (formData: yup.InferType<typeof passwordSchema>) => {
    confirm({
      title: 'Change Password',
      description: 'Are you sure you want to change your password? make sure the details are correct.',
    })
      .then(async () => {
        try {
          await changePassword(formData);
          toast({
            title: 'Password changed',
            description: 'Your password has been changed successfully',
          });
          form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='enter your current password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='new_password'
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

          <FormField
            control={form.control}
            name='confirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='confirm your password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PasswordMeter password={form.watch('new_password')} />

        <div className='flex justify-start'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
            Update Password
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
