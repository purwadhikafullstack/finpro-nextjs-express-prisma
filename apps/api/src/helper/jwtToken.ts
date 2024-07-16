import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '@/config';

export const createToken = ({ userId, userRole }: { userId: string, userRole: number }) => {
  const privateKey = PRIVATE_KEY;  
  const expiresIn = '5d';

  return jwt.sign(
    { userId, userRole },
    privateKey,
    {
      algorithm: 'HS256',  
      expiresIn
    }
  );
};
