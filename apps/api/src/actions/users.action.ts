import { Prisma, Role } from '@prisma/client';

import ApiError from '@/utils/api.error';
import prisma from '@/libs/prisma';

export default class UserAction {
  index = async (
    page: number,
    limit: number,
    id: string | undefined,
    value: string | undefined,
    key: string | undefined,
    desc: string | undefined
  ) => {
    try {
      let filter;
      let order;

      if (id && value) {
        filter = {
          [id as keyof Prisma.UserSelect]: { contains: value as string },
        };
      }

      if (key && desc) {
        order = [
          {
            [key as keyof Prisma.UserSelect]: desc === 'true' ? 'desc' : 'asc',
          },
        ];
      }

      const query = {
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order,
      };

      const [users, count] = await prisma.$transaction([prisma.user.findMany(query), prisma.user.count(query)]);

      return [users, count];
    } catch (error) {
      throw error;
    }
  };

  show = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      return user;
    } catch (error) {
      throw error;
    }
  };

  create = async (email: string, fullname: string, phone: string) => {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          fullname,
          phone,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  update = async (
    user_id: string,
    fullname: string,
    phone: string,
    role: Role,
    is_verified: boolean,
    avatar_url: string | null = null
  ) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      await prisma.user.update({
        where: { user_id },
        data: {
          fullname,
          phone,
          role,
          is_verified,
          ...(avatar_url && { avatar_url: avatar_url }),
        },
      });

      if (is_verified && role === Role.Customer) {
        await prisma.customer.upsert({
          where: { user_id },
          create: {
            user_id,
          },
          update: {},
        });
      }

      user.fullname = fullname;
      user.phone = phone;

      return user;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (user_id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });

      if (!user) throw new ApiError(404, 'User not found');

      await prisma.user.delete({
        where: { user_id },
      });

      return user;
    } catch (error) {
      throw error;
    }
  };
}