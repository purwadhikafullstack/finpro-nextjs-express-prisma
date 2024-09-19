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

import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import { LaundryItem } from '@/types/laundry-item';
import { Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import { useForm } from 'react-hook-form';
import { useLaundryItems } from '@/hooks/use-laundry-items';
import { useToast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditLaundryItemModalProps {
  item: LaundryItem;
}

const laundryItemSchema = yup.object({
  name: yup.string().required(),
  icon_url: yup.string().url().required(),
});

const EditLaundryItemModal: React.FC<EditLaundryItemModalProps> = ({ item, ...props }) => {
  const { toast } = useToast();
  const { mutate } = useLaundryItems();
  const [open, setOpen] = React.useState(false);

  const form = useForm<yup.InferType<typeof laundryItemSchema>>({
    resolver: yupResolver(laundryItemSchema),
    defaultValues: {
      name: item.name,
      icon_url: item.icon_url,
    },
  });

  const onSubmit = async (formData: yup.InferType<typeof laundryItemSchema>) => {
    try {
      await axios.put('/laundry-items/' + item.laundry_item_id, formData);
      toast({
        title: 'Laundry Item updated',
        description: 'Your laundry item has been updated successfully',
      });
      form.reset();
      setOpen(false);
      mutate();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to update laundry item',
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className='block w-full px-2 py-1.5 text-sm rounded-sm hover:bg-muted'>Edit Item</span>
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
                Update Laundry Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLaundryItemModal;
