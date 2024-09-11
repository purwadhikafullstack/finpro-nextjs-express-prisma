import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import ApiError from '@/utils/api.error';
import { JWT_SECRET } from '@/config';
import { verify } from 'jsonwebtoken';

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
}
