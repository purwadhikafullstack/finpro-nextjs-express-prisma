'use client';

import * as React from 'react';
import * as yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface SetPasswordFormProps {
  //
}

const rules = [
  {
    label: 'Must be at least 10 characters',
    regex: /.{10,}/,
  },
  {
    label: 'Must contain at least one uppercase letter',
    regex: /[A-Z]/,
  },
  {
    label: 'Must contain at least one lowercase letter',
    regex: /[a-z]/,
  },
  {
    label: 'Must contain at least one number',
    regex: /[0-9]/,
  },
  {
    label: 'Must contain at least one special character',
    regex: /[^A-Za-z0-9]/,
  },
];

const level = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent'];

const passwordSchema = yup.object({
  password: yup.string().required(),
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

  const password = form.watch('password');

  const strength = React.useMemo(() => {
    let index = 0;
    rules.forEach((rule) => {
      if (rule.regex.test(password)) {
        index += 1;
      }
    });

    return {
      value: index,
      status: level[index],
    };
  }, [password]);

  const state = React.useMemo(() => {
    if (!password) return rules.map((rule) => ({ ...rule, valid: false }));
    return rules.map((rule) => ({
      ...rule,
      valid: rule.regex.test(password),
    }));
  }, [password]);

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

        {state.map((rule, idx) => (
          <div key={idx} className={cn('flex items-center space-x-2 text-red-500', rule.valid && 'text-green-500')}>
            <Check className='w-4 h-4' aria-hidden='true' />
            <div className='text-sm'>{rule.label}</div>
          </div>
        ))}

        <div className='flex items-center space-x-2'>
          <span className='w-20 text-sm'>{strength.status}</span>
          <Progress value={(strength.value * 100) / state.length} className='h-2' />
        </div>

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
