import { comparePasswords, generateAccessToken, generateHash, generateRefreshToken } from '@/utils/encrypt.util';

import ApiError from '@/utils/error.util';
import EmailAction from './email.action';
import prisma from '@/libs/prisma';

export default class ProfileAction {
  private emailAction: EmailAction;

  constructor() {
    this.emailAction = new EmailAction();
  }

  show = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User data not found');

      return user;
    } catch (error) {
      throw error;
    }
  };

  update = async (user_id: string, fullname: string, phone: string, avatar_url: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User data not found');

      await prisma.user.update({
        where: { user_id },
        data: { fullname, phone, avatar_url },
      });

      user.fullname = fullname;
      user.phone = phone;
      user.avatar_url = avatar_url;

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        is_verified: user.is_verified,
      });

      return { access_token };
    } catch (error) {
      throw error;
    }
  };

  changePassword = async (user_id: string, password: string, new_password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User data not found');
      if (!user.password || !user.is_verified) {
        throw new ApiError(400, 'Your account is not verified, please verify your email first');
      }

      const valid = await comparePasswords(password, user.password);
      if (!valid) throw new ApiError(400, 'Your current password is incorrect');

      const hashed = await generateHash(new_password);
      await prisma.user.update({
        where: { user_id },
        data: { password: hashed },
      });
    } catch (error) {
      throw error;
    }
  };

  changeEmail = async (user_id: string, email: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User data not found');
      if (!user.password || !user.is_verified) {
        throw new ApiError(400, 'Your account is not verified, please verify your email first');
      }

      const duplicate = await prisma.user.findUnique({
        where: { email },
      });
      if (duplicate) throw new ApiError(400, 'Email already exists');

      const valid = await comparePasswords(password, user.password);
      if (!valid) throw new ApiError(400, 'Your current password is incorrect');

      const updated = await prisma.user.update({
        where: { user_id },
        data: {
          email,
          is_verified: false,
        },
      });

      await this.emailAction.sendEmailChangeEmail(updated);

      const access_token = generateAccessToken({
        user_id: updated.user_id,
        fullname: updated.fullname,
        email: updated.email,
        avatar_url: updated.avatar_url,
        role: updated.role,
        is_verified: updated.is_verified,
      });

      const refresh_token = generateRefreshToken({
        user_id: updated.user_id,
        email: updated.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };
}
