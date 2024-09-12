import { DeliveryType, Prisma, ProgressType } from '@prisma/client';

import ApiError from '@/utils/error.util';
import prisma from '@/prisma';

export default class DeliveryAction {
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
          [id as keyof Prisma.DeliverySelect]: { contains: value as string },
        };
      }

      if (key && value) {
        order = {
          [key as keyof Prisma.DeliverySelect]: desc === 'true' ? 'desc' : 'asc',
        };
      }

      const query = {
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: order,
      };

      const [deliveries, count] = await prisma.$transaction([
        prisma.delivery.findMany(query),
        prisma.delivery.count(query),
      ]);

      return [deliveries, count];
    } catch (error) {
      throw error;
    }
  };

  show = async (delivery_id: string) => {
    try {
      const delivery = await prisma.delivery.findUnique({
        where: { delivery_id },
      });

      if (!delivery) throw new ApiError(404, 'Delivery not found');

      return delivery;
    } catch (error) {
      throw error;
    }
  };

  create = async (order_id: string, outlet_id: string, type: DeliveryType) => {
    try {
      const order = await prisma.order.findUnique({
        where: { order_id },
      });

      if (!order) throw new ApiError(404, 'Order not found');

      const outlet = await prisma.outlet.findUnique({
        where: { outlet_id },
      });

      if (!outlet) throw new ApiError(404, 'Outlet not found');

      const delivery = await prisma.delivery.create({
        data: {
          order_id,
          outlet_id,
          type: type,
        },
      });

      return delivery;
    } catch (error) {
      throw error;
    }
  };

  update = async (delivery_id: string, progress: ProgressType) => {
    try {
      const delivery = await prisma.delivery.findUnique({
        where: { delivery_id },
      });

      if (!delivery) throw new ApiError(404, 'Delivery not found');

      await prisma.delivery.update({
        where: { delivery_id },
        data: { progress },
      });

      return delivery;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (delivery_id: string) => {
    try {
      const delivery = await prisma.delivery.findUnique({
        where: { delivery_id },
      });

      if (!delivery) throw new ApiError(404, 'Delivery not found');

      await prisma.delivery.delete({
        where: { delivery_id },
      });

      return delivery;
    } catch (error) {
      throw error;
    }
  };
}
