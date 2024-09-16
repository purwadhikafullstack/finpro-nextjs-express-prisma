import { Prisma, Role } from '@prisma/client';

import ApiError from '@/utils/error.util';
import { generateHash } from '@/utils/encrypt.util';
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
          [id as keyof Prisma.UserSelect]: { contains: value as string, mode: 'insensitive' },
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
        orderBy: order,
      };

      const [users, count] = await prisma.$transaction([
        prisma.user.findMany({
          ...query,
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.user.count(query),
      ]);

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

  create = async (email: string, fullname: string, phone: string, password: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) throw new ApiError(400, 'Email already used by another user');

      const hashed = await generateHash(password);
      const created = await prisma.user.create({
        data: {
          email,
          fullname,
          phone,
          password: hashed,
          role: Role.Employee,
          is_verified: true,
          Customer: {
            create: {
              //
            },
          },
        },
      });

      return created;
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

  search = async (query: string | undefined) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              fullname: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
          role: {
            equals: 'Employee',
          },
        },
        select: {
          user_id: true,
          fullname: true,
          email: true,
          role: true,
        },
      });

      return users;
    } catch (error) {
      throw error;
    }
  };
}
