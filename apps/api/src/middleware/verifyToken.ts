import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { PRIVATE_KEY } from '@/config';

interface IRequest extends Request {
    payload?: any;
}

export const verifyToken = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    const privateKey = PRIVATE_KEY;

    if (!authorization) {
      return res.status(401).json({ message: 'Token is missing'});
    }

    const token = authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, privateKey);

    console.log(decodedToken)

    req.payload = decodedToken
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next(error);
  }
};
