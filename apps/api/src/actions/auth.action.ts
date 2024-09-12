import { comparePasswords, generateAccessToken, generateHash, generateRefreshToken } from '@/utils/encrypt.util';

import ApiError from '@/utils/error.util';
import EmailAction from '@/actions/email.action';
import { User } from '@prisma/client';
import prisma from '@/libs/prisma';

export default class AuthAction {
  private emailAction: EmailAction;

  constructor() {
    this.emailAction = new EmailAction();
  }

  login = async (email: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new ApiError(400, 'Invalid email or password');
      if (!user.password || !user.is_verified) throw new ApiError(400, 'Please verify your email, to login');

      const valid = await comparePasswords(password, user.password);
      if (!valid) throw new ApiError(400, 'Invalid email or password');

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };

  register = async (email: string, fullname: string, phone: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) throw new ApiError(400, 'Email already exists');

      const created = await prisma.user.create({
        data: {
          email,
          fullname,
          phone,
        },
      });

      await this.emailAction.sendVerificationEmail(created);
    } catch (error) {
      throw error;
    }
  };

  verify = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });
      if (!user) throw new ApiError(404, 'User not found');

      user.is_verified = true;
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: { is_verified: true },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  setPassword = async (user_id: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      const hashed = await generateHash(password);
      await prisma.user.update({
        where: { user_id: user_id },
        data: { password: hashed },
      });

      await prisma.customer.create({
        data: {
          user_id,
        },
      });

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };

  refresh = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };

  google = async (user: User) => {
    try {
      const access_token = generateAccessToken({
        user_id: user.user_id,
        fullname: user.fullname,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
      });

      const refresh_token = generateRefreshToken({
        user_id: user.user_id,
        email: user.email,
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw error;
    }
  };
}
