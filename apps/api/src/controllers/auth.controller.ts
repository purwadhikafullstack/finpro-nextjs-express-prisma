import * as yup from 'yup';

import { EmailTokenPayload, RefreshTokenPayload } from '@/type/jwt';
import { NextFunction, Request, Response } from 'express';

import ApiResponse from '@/utils/api.response';
import AuthAction from '@/actions/auth.action';
import { FRONTEND_URL } from '@/config';

export default class AuthController {
  private authAction: AuthAction;

  constructor() {
    this.authAction = new AuthAction();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = await yup
        .object({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })
        .validate(req.body);

      const { access_token, refresh_token } = await this.authAction.login(email, password);

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json(
        new ApiResponse('Login successful', {
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, fullname, phone } = await yup
        .object({
          email: yup.string().email().required(),
          fullname: yup.string().required(),
          phone: yup.string().required(),
        })
        .validate(req.body);

      await this.authAction.register(email, fullname, phone);

      return res.status(201).json(
        new ApiResponse('Register successful, please check your email to verify your account', {
          email,
          fullname,
          phone,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as EmailTokenPayload;

      const { user_id } = user;
      await this.authAction.verify(user_id);

      const { token } = await yup
        .object({
          token: yup.string().required(),
        })
        .validate(req.query);

      const url = new URL(FRONTEND_URL);
      url.pathname = '/auth/set-password';
      url.searchParams.set('token', token);

      return res.redirect(url.toString());
    } catch (error) {
      next(error);
    }
  };

  setPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = await yup
        .object({
          password: yup.string().required(),
        })
        .validate(req.body);

      const { user_id } = req.user as EmailTokenPayload;
      const { access_token, refresh_token } = await this.authAction.setPassword(user_id, password);

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json(
        new ApiResponse('Password set successfully', {
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('refresh_token');
      return res.status(200).json(new ApiResponse('Logout successful'));
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as RefreshTokenPayload;

      const { access_token, refresh_token } = await this.authAction.refresh(user_id);

      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json(
        new ApiResponse('Refresh successful', {
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  };
}
