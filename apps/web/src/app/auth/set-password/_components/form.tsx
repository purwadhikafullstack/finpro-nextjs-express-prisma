'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PasswordMeter from '@/components/password-meter';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface SetPasswordFormProps {
  //
}

const passwordSchema = yup.object({
  password: yup
    .string()
    .min(10, 'Password is too short')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required(),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required(),
  token: yup.string().required(),
});

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({ ...props }) => {
  const router = useRouter();
  const search = useSearchParams();

  const { toast } = useToast();
  const { verify } = useAuth();

  const form = useForm<yup.InferType<typeof passwordSchema>>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmation: '',
      token: '',
    },
  });

  React.useEffect(() => {
    if (search.has('token')) {
      const token = search.get('token');
      form.setValue('token', token as string);
    }
  }, [search, form]);

  const onSubmit = async (formData: yup.InferType<typeof passwordSchema>) => {
    try {
      await verify(formData);
      toast({
        title: 'Password set successfully',
        description: 'Please login with your new password',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Password set failed',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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

        <PasswordMeter password={form.watch('password')} />

        <FormField
          control={form.control}
          name='token'
          render={({ field }) => <Input type='hidden' placeholder='enter your token' {...field} />}
        />

        <Button type='submit' className='w-full'>
          Set Password
        </Button>
      </form>
    </Form>
  );
};

export default SetPasswordForm;
