'use client';

import * as React from 'react';
import * as yup from 'yup';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';
import useConfirm from '@/hooks/use-confirm';
import { useForm } from 'react-hook-form';
import { useLaundryItems } from '@/hooks/use-laundry-items';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface CreateLaundryItemProps {
  //
}

const laundryItemSchema = yup.object({
  name: yup.string().required(),
  icon_url: yup.string().url().required(),
});

const CreateLaundryItemModal: React.FC<CreateLaundryItemProps> = ({ ...props }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { mutate } = useLaundryItems();
  const [open, setOpen] = React.useState(false);

  const form = useForm<yup.InferType<typeof laundryItemSchema>>({
    resolver: yupResolver(laundryItemSchema),
    defaultValues: {
      name: '',
      icon_url: '',
    },
  });

  const onSubmit = async (formData: yup.InferType<typeof laundryItemSchema>) => {
    confirm({
      title: 'Create Laundry Item',
      description: 'Are you sure you want to create this laundry item? make sure the details are correct.',
    })
      .then(async () => {
        try {
          await axios.post('/laundry-items', formData);
          toast({
            title: 'Laundry Item created',
            description: 'Your laundry item has been created successfully',
          });
          form.reset();
          setOpen(false);
          mutate();
        } catch (error: any) {
          toast({
            variant: 'destructive',
            title: 'Failed to create laundry item',
            description: error.message,
          });
        }
      })
      .catch(() => {
        // do nothing
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <Plus className='inline-block w-4 h-4 mr-2' />
          <span>Add Laundry Item</span>
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Create New Laundry Item</DialogTitle>
          <DialogDescription>Create a new laundry item.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormLabel>Image</FormLabel>
                    <ImageUpload
                      imageWidth={300}
                      imageHeight={300}
                      asset_folder={'laundry_items'}
                      src={form.watch('icon_url')}
                      eager='w_200,h_200,c_fill'
                      onChangeImage={(original, eager) => form.setValue('icon_url', eager ? eager : original)}
                      className='overflow-hidden border rounded-lg bg-accent aspect-square'
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className='mt-4 sm:justify-end'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className='mr-2 size-4 animate-spin' />}
                Create Laundry Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLaundryItemModal;
