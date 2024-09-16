import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiError from '@/utils/error.util';
import { Role } from '@prisma/client';

export class RoleMiddleware {
  role = (role: Role | Role[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as AccessTokenPayload;
      if (Array.isArray(role)) {
        if (!role.includes(user.role)) throw new ApiError(403, 'You are not authorized to access this route');
        return next();
      }
      if (user.role !== role) throw new ApiError(403, 'You are not authorized to access this route');
      next();
    } catch (error) {
      next(error);
    }
  };
}
