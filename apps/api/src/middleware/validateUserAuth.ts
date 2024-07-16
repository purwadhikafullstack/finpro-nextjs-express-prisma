import { NextFunction, Request, Response } from 'express';

export const validateUserAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // password max length
    if(password.length > 32){
        throw { message: 'Password cannot be more than 32 characters'}
    }

    // validate if body was filled
    if (!email || !password) {
      throw { message: 'email & password must be filled', status: 401 };
    }
    next();
  } catch (error) {
    next(error);
  }
};
