import { Request, Response, NextFunction } from 'express';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { User } from '@/types/express';
import { HttpException } from '@/exceptions/http.exception';

interface JwtPayload {
  userId: number;
  email: string;
}

export class AuthMiddleware {
  verifyAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new HttpException(401, 'Token is missing or invalid');

      const isTokenValid = verify(token, String(process.env.API_KEY));
      if (!isTokenValid) throw new HttpException(500, 'Unauthorized');

      req.user = isTokenValid as User;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({
          message: 'Token expired, please refresh token',
        });
      }
      next(error);
    }
  };

  verifyRefreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const refreshToken = req.cookies['refresh-token'];
      if (!refreshToken) throw new HttpException(401, 'Missing refresh token');

      const decodedToken = verify(refreshToken, String(process.env.API_KEY));
      req.user = decodedToken as User;
      next();
    } catch (error) {
      next(error);
    }
  };

  verifyEmailToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token =
        (req.query.token as string) ||
        req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new HttpException(400, 'Missing Token');

      const decoded = verify(token, String(process.env.JWT_SECRET));
      if (!decoded) throw new HttpException(400, 'Invalid or expired token');

      req.user = decoded as User;

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(400).json({
          message: 'Verification token expired, please request a new one',
        });
      }
      next(error);
    }
  };
}
