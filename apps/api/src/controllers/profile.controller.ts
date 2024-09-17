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
}
