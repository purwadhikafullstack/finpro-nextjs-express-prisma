import { Prisma, Role } from '@prisma/client';

import ApiError from '@/utils/error.util';
import prisma from '@/libs/prisma';

export default class OrderAction {
  index = async (
    user_id: string,
    role: Role,
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
          [id as keyof Prisma.OrderSelect]: { contains: value as string, mode: 'insensitive' },
        };
      }

      if (key && desc) {
        order = [
          {
            [key as keyof Prisma.OrderSelect]: desc === 'true' ? 'desc' : 'asc',
          },
        ];
      }

      let query;

      if (role === 'SuperAdmin') {
        query = {
          where: filter,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: order,
        };
      } else {
        query = {
          where: {
            ...filter,
            Outlet: {
              Employee: {
                some: {
                  User: {
                    user_id,
                  },
                },
              },
            },
          },
          orderBy: order,
        };
      }

      const [orders, count] = await prisma.$transaction([
        prisma.order.findMany({
          ...query,
          skip: (page - 1) * limit,
          take: limit,
          include: {
            Outlet: true,
            OrderProgress: {
              orderBy: {
                created_at: 'desc',
              },
            },
            Customer: {
              include: {
                User: true,
              },
            },
          },
        } as Prisma.OrderFindManyArgs),

        prisma.order.count(query as Prisma.OrderCountArgs),
      ]);

      return [orders, count];
    } catch (error) {
      throw error;
    }
  };

  customer = async (user_id: string, type: 'All' | 'Ongoing' | 'Completed' | undefined) => {
    try {
      const customer = await prisma.customer.findUnique({
        where: { user_id },
      });
      if (!customer) throw new ApiError(404, 'Customer not found');

      const orders = await prisma.order.findMany({
        where: {
          customer_id: customer.customer_id,
          ...(type !== 'All' && {
            is_completed: type === 'Completed',
          }),
        },
        include: {
          Outlet: true,
          OrderProgress: {
            orderBy: {
              created_at: 'desc',
            },
          },
        },
      });

      return orders;
    } catch (error) {
      throw error;
    }
  };

  show = async (order_id: string) => {
    try {
      const order = await prisma.order.findUnique({
        where: { order_id },
        include: {
          OrderItem: {
            include: {
              LaundryItem: true,
            },
          },
          Outlet: true,
          Customer: {
            include: {
              User: true,
            },
          },
          CustomerAddress: true,
          OrderProgress: true,
        },
      });

      if (!order) throw new ApiError(404, 'Order not found');

      return order;
    } catch (error) {
      throw error;
    }
  };
}
