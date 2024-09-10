import ApiError from '@/utils/api.error';
import { Prisma } from '@prisma/client';
import prisma from '@/libs/prisma';

export default class OutletsAction {
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
          [id as keyof Prisma.OutletSelect]: { contains: value as string },
        };
      }

      if (key && desc) {
        order = [
          {
            [key as keyof Prisma.OutletSelect]: desc === 'true' ? 'desc' : 'asc',
          },
        ];
      }

      const query = {
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order,
      };

      const [outlets, count] = await prisma.$transaction([prisma.outlet.findMany(query), prisma.outlet.count(query)]);

      return [outlets, count];
    } catch (error) {
      throw error;
    }
  };

  show = async (outlet_id: string) => {
    try {
      const outlet = await prisma.outlet.findUnique({
        where: { outlet_id },
      });

      if (!outlet) throw new ApiError(404, 'Outlet not found');

      return outlet;
    } catch (error) {
      throw error;
    }
  };
}
