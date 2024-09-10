import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiError from '@/utils/api.error';
import ApiResponse from '@/utils/api.response';
import ProfileAction from '@/actions/profile.action';
import prisma from '@/libs/prisma';

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

      const { fullname, phone } = await yup
        .object({
          fullname: yup.string().required(),
          phone: yup.string().required(),
        })
        .validate(req.body);

      const { password, ...rest } = await this.profileAction.update(user_id, fullname, phone);

      return res.status(200).json(new ApiResponse('Profile updated successfully', rest));
    } catch (error) {
      next(error);
    }
  };
}
