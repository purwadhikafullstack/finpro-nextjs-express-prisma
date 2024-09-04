import { Request, Response, NextFunction } from 'express';
import authAction from '@/actions/auth.action';
import { HttpException } from '@/exceptions/http.exception';
import { sendVerificationEmail } from '@/utils/emailUtil';
import passport from 'passport';
import { generateToken } from '@/utils/tokenUtil';

interface JwtPayload {
  userId: number;
  email: string;
}

export class AuthController {
  registerWithEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, first_name, last_name, phone_number } = req.body;

      const user = await authAction.registerWithEmailAction(
        email,
        first_name,
        last_name,
        phone_number,
      );

      await sendVerificationEmail(user);

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

      res
        .status(200)
        .cookie('access-token', user?.accessToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, // 1 jam
        })
        .cookie('refresh-token', user?.refreshToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, // 1 jam
        })
        .json({
          message: 'Successfully logged in',
          data: user,
        });
    } catch (error) {
      console.error('Login Error:', error); // Logging untuk debugging
      next(error);
    }
  };

  refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.user as JwtPayload;
      const tokens = await authAction.refreshTokenAction(email);

      res.status(200).json({
        message: 'Token refreshed successfully',
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      console.error('Refresh Token Error:', error);
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

      // Redirect user to /set-password with the token as a query parameter
      const token = req.query.token;
      const setPasswordUrl = `${process.env.FE_BASE_URL}/set-password?token=${token}`;

      return res.redirect(setPasswordUrl);
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

  setPasswordController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { password } = req.body;
      const { userId } = req.user as JwtPayload;

      if (!password) {
        throw new HttpException(400, 'Password is required');
      }

      const updatedUser = await authAction.setPassword(userId, password);

      res.status(200).json({
        message: 'Password set successfully',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

  googleCallbackController = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    passport.authenticate('google', async (err: any, user: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }

      try {
        // Generate tokens like you do in loginAction
        const accessPayload = {
          userId: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phoneNumber: user.phone_number,
          avatarFilename: user.avatarFilename,
          isVerified: user.is_verified,
        };

        const refreshPayload = {
          email: user.email,
        };

        const accessToken = generateToken(
          accessPayload,
          '1h', // dibuat 1 menit di development agar proses testing lebih mudah
          String(process.env.API_KEY),
        );

        const refreshToken = generateToken(
          refreshPayload,
          '1h', //dibuat 1 jam di development agar proses testing lebih mudah
          String(process.env.API_KEY),
        );

        // Set the cookies
        res
          .cookie('access-token', accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 jam
          })
          .cookie('refresh-token', refreshToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 jam
          })
          .redirect(`${process.env.FE_BASE_URL}`);
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  };
}
