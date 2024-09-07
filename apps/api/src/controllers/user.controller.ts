import { Request, Response, NextFunction } from 'express';
import userAction from '@/actions/user.action';
import { User } from '@/types/express';

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

  findSelfByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;

      const user = await userAction.findSelfById(user_id);

      res.status(200).json({
        message: 'Get user profile success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id } = req.user as User;

      const { file } = req;
      const { first_name, last_name, email, phone_number } = req.body;

      const user = await userAction.updateSelfById({
        user_id,
        first_name,
        last_name,
        email,
        phone_number,
        avatarFilename: file?.filename,
      });

      res.status(200).json({
        message: 'Update user profile success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}
