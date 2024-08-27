import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const ErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Cek apakah ada file yg diupload, jika ada maka hapus
    if (req.file) {
      const filePath = path.join(
        __dirname,
        '../../public/avatar',
        req.file.filename,
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`File deleted: ${filePath}`);
        }
      });
    }

    res.status(500).send(error.message);
  } catch (err) {
    next(err);
  }
};
