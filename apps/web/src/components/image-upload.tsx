import * as React from 'react';

import { Aperture, Camera, Loader2 } from 'lucide-react';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Progress } from './ui/progress';
import axios from '@/lib/axios';
import cloudinary from '@/lib/cloudinary';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  eager?: string;
  className?: string;
  imageWidth: number;
  imageHeight: number;
  asset_folder: string;
  onChangeImage: (original: string, eager: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  src,
  eager,
  className,
  imageWidth,
  imageHeight,
  asset_folder,
  onChangeImage,
  ...props
}) => {
  const { toast } = useToast();
  const ref = React.useRef<HTMLInputElement>(null);
  const [progress, setProgress] = React.useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const { data } = await axios.post<{
        mesage: string;
        data: {
          api_key: string;
          timestamp: string;
          signature: string;
          cloud_name: string;
        };
      }>('/upload/sign', {
        asset_folder,
        eager,
      });

      const { api_key, timestamp, signature, cloud_name } = data.data;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', api_key);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('asset_folder', asset_folder);
      eager && formData.append('eager', eager);

      const { data: result } = await cloudinary.post(cloud_name + '/auto/upload', formData, {
        onUploadProgress: ({ loaded, total }) => {
          setProgress(() => Math.round((loaded * 100) / (total || 100)));
        },
      });

      onChangeImage(result.secure_url, result.eager && result.eager[0].secure_url);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error uploading image',
        description: error.message,
      });
    } finally {
      setProgress(0);
    }
  };

  const uploading = progress > 0;

  return (
    <div>
      <div
        onClick={() => !uploading && ref.current?.click()}
        className={cn('relative cursor-pointer group overflow-hidden', className)}
        {...props}>
        {!uploading && (
          <div className='absolute flex items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 bg-zinc-50/75'>
            <Aperture className='size-6 text-primary' />
          </div>
        )}

        {uploading && (
          <div className='absolute flex flex-col items-center justify-center w-full h-full space-y-2 bg-zinc-50/75'>
            <Progress value={progress} className='w-4/5 h-2 mx-auto' />
          </div>
        )}

        <Input
          ref={ref}
          type='file'
          accept='image/*'
          className='hidden'
          placeholder='Upload your user avatar'
          onChange={handleFileChange}
        />

        {src && (
          <Image
            src={src}
            alt='user avatar'
            width={imageWidth}
            height={imageHeight}
            className='object-cover object-center w-full h-full'
          />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
