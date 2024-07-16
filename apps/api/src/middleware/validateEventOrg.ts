import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

interface IRequest extends Request {
  payload?: any;
}

export const validateEventOrg  = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, roleId } = req.payload;

    if (roleId == 3 ) {
      throw { message: 'Employee is not an Admin', status: 401 };
    }

    req.payload = {
      userId
    }
    next();
  } catch (error) {
    next(error);
  }
};
