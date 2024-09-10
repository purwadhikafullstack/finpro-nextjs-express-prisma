import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import ApiError from '@/utils/api.error';
import { JWT_SECRET } from '@/config';
import { verify } from 'jsonwebtoken';

interface AgentPayload {
  agent_id: number;
  username: string;
  role: string;
}

export class AuthMiddleware {
  header = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization) throw new ApiError(401, 'Unauthorized, please login');

      const token = authorization.split(' ')[1];
      verify(token, JWT_SECRET, (error, decoded) => {
        if (error) throw new ApiError(401, error.message);
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  cookie = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refresh_token } = req.cookies;

      const token = refresh_token as string;
      verify(token, JWT_SECRET, (error, decoded) => {
        if (error) throw new ApiError(401, error.message);
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  query = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = await yup
        .object({
          token: yup.string().required(),
        })
        .validate(req.query);

      verify(token, JWT_SECRET, (error, decoded) => {
        if (error) throw new ApiError(401, error.message);
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  body = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = await yup
        .object({
          token: yup.string().required(),
        })
        .validate(req.body);

      verify(token, JWT_SECRET, (error, decoded) => {
        if (error) throw new ApiError(401, error.message);
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  // ======================================== NON-USER MIDDLEWARE ========================================

  verifyAgentAccessToken = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        throw new HttpException(401, 'Token is missing or invalid');
      }

      const decoded = verify(
        token,
        String(process.env.API_KEY),
      ) as AgentPayload;

      // Periksa apakah pengguna adalah agent admin, worker, atau driver
      if (!['worker', 'admin', 'driver'].includes(decoded.role)) {
        throw new HttpException(403, 'Access Denied: Not an authorized agent');
      }

      // Simpan informasi agent dalam req.user
      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      next(new HttpException(401, 'Unauthorized'));
    }
  };

  authorizeRoles = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req.user as { role?: string };
        const userRole = user?.role;

        // Cek apakah userRole undefined atau tidak termasuk dalam allowedRoles
        if (!userRole || !allowedRoles.includes(userRole)) {
          throw new HttpException(403, 'Access Denied');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
