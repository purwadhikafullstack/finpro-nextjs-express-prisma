import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { join } from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (
  filePrefix: string,
  folderName?: string,
  maxFileSize?: number,
) => {
  const defaultDir = join(__dirname, '../../public');

  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      cb(null, destination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FilenameCallback,
    ) => {
      const originalNameParts = file.originalname.split('.');
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFileName = filePrefix + Date.now() + '.' + fileExtension;
      cb(null, newFileName);
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
    if (fileExtension && allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Invalid file type. Only jpg, jpeg, png, and gif are allowed.',
        ),
      );
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxFileSize || 1 * 1024 * 1024 }, // Default to 1MB if not provided
    fileFilter,
  });
};
