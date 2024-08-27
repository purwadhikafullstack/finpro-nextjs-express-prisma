import { Request, Response, NextFunction } from 'express';
import authAction from '@/actions/auth.action';

export class AuthController {
  registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { file } = req;
      const { email, password, first_name, last_name, phone_number } = req.body;
      const avatarFileName = file?.filename ? file.filename : 'avatarempty.jpg';

      const user = await authAction.registerAction(
        email,
        password,
        first_name,
        last_name,
        phone_number,
        avatarFileName,
      );

      await authAction.sendVerificationEmail(user);

      res.status(201).json({
        message:
          'User registration success, please check your email to verify your account',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await authAction.loginAction(email, password);

      res.status(200).json({
        message: 'Successfully logged in',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  verifyEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await authAction.activateUserEmail(req);

      if (result.message) {
        return res.status(200).json({
          message: result.message,
        });
      }

      res.status(200).json({
        message: 'Email verification successful',
        data: result.user,
      });
    } catch (error) {
      next(error);
    }
  };

  resendVerificationController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;

      await authAction.resendVerificationEmail(email);

      res.status(200).json({
        message: 'Verification email resent, please check your email',
      });
    } catch (error) {
      next(error);
    }
  };
}
