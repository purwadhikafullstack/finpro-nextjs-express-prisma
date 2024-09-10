import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiError from '@/utils/api.error';

export class RoleMiddleware {
  role = (role: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as AccessTokenPayload;
      if (user.role !== role) throw new ApiError(403, 'You are not authorized to access this route');
      next();
    } catch (error) {
      next(error);
    }
  };
}
