import { Request, Response, NextFunction } from 'express';
import userAction from '@/actions/user.action';

export class UserController {
  getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.params;

      const user = await userAction.findUserByEmail(email);

      res.status(200).json({
        message: 'Get user success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  getUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user = await userAction.findUsers();

    res.status(200).json({
      message: 'Get users success',
      data: user,
    });

    try {
    } catch (error) {
      next(error);
    }
  };
}
