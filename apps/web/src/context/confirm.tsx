'use client';

import * as React from 'react';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ConfirmContextProps {
  confirm: (options: ModalOption) => Promise<unknown>;
}

const ConfirmContext = React.createContext<ConfirmContextProps>({
  confirm: async () => {},
});

interface ModalOption {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
}

interface PromiseHandler {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
  const promise = React.useRef<PromiseHandler | null>(null);
  const [options, setOptions] = React.useState<ModalOption | null>();

  const confirm = ({ title, description, variant = 'default' }: ModalOption) => {
    setOptions({
      title,
      variant,
      description,
    });
    return new Promise((resolve, reject) => {
      promise.current = { resolve, reject };
    });
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (promise.current) promise.current.resolve(null);
    setOptions(null);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (promise.current) promise.current.reject(null);
    setOptions(null);
  };

  return (
    <>
      <ConfirmContext.Provider value={{ confirm }}>{children}</ConfirmContext.Provider>

      <Dialog open={!!options} onOpenChange={(open) => !open && setOptions(null)}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='text-start'>{options && options.title}</DialogTitle>
          </DialogHeader>
          <p className='text-sm text-muted-foreground'>{options && options.description}</p>
          <DialogFooter>
            <div className='flex justify-end w-full space-x-2'>
              <DialogClose asChild>
                <Button variant='secondary' onClick={handleCancel}>
                  Close
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant={options && options.variant} onClick={handleConfirm} autoFocus>
                  <Check className='mr-2 size-4' />
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmContext;
