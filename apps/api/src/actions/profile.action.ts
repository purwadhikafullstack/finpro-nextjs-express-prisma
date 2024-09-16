import ApiError from '@/utils/error.util';
import { generateAccessToken } from '@/utils/encrypt.util';
import prisma from '@/libs/prisma';

export default class ProfileAction {
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
}
