import { sign } from 'jsonwebtoken';
import { HttpException } from '@/exceptions/http.exception';

export const generateToken = (
  payload: Record<string, any>,
  expiresIn: string | number,
  secretKey: string,
) => {
  try {
    return sign(payload, secretKey, {
      expiresIn,
    });
  } catch (error) {
    throw new HttpException(
      500,
      `Error generating token: ${(error as Error).message}`,
    );
  }
};
