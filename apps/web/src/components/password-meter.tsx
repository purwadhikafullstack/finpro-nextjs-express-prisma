'use client';

import * as React from 'react';

import { Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

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

interface PasswordMeterProps {
  password: string;
}

const PasswordMeter: React.FC<PasswordMeterProps> = ({ password }) => {
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

  return (
    <>
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
    </>
  );
};

export default PasswordMeter;
