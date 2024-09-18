import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiResponse from '@/utils/response.util';
import ProfileAction from '@/actions/profile.action';

export default class ProfileController {
  private profileAction: ProfileAction;

  constructor() {
    this.profileAction = new ProfileAction();
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { password, ...rest } = await this.profileAction.show(user_id);

      return res.status(200).json(new ApiResponse('Profile retrieved successfully', rest));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { fullname, phone, avatar_url } = await yup
        .object({
          fullname: yup.string().min(6, 'Full name is too short').max(50, 'Full name is too long').required(),
          phone: yup
            .string()
            .min(10, 'Phone number is too short')
            .max(13, 'Phone number is too long')
            .matches(/^\d+$/, 'Phone number must be a number')
            .required(),
          avatar_url: yup.string().required(),
        })
        .validate(req.body);

      const { access_token } = await this.profileAction.update(user_id, fullname, phone, avatar_url);

      return res.status(200).json(
        new ApiResponse('Profile updated successfully', {
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { password, new_password, confirmation } = await yup
        .object({
          password: yup.string().required(),
          new_password: yup
            .string()
            .min(10, 'Password is too short')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
            .required(),
          confirmation: yup
            .string()
            .oneOf([yup.ref('new_password')], 'Passwords do not match')
            .required(),
        })
        .validate(req.body);

      await this.profileAction.changePassword(user_id, password, new_password);

      return res.status(200).json(new ApiResponse('Password changed successfully'));
    } catch (error) {
      next(error);
    }
  };

  changeEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { email, password } = await yup
        .object({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })
        .validate(req.body);

      const { access_token } = await this.profileAction.changeEmail(user_id, email, password);

      res.cookie('refresh_token', access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(200).json(
        new ApiResponse('Email changed successfully, please verify your new email', {
          access_token,
        })
      );
    } catch (error) {
      next(error);
    }
  };
}
