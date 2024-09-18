import { MIDTRANS_PASSWORD, MIDTRANS_SERVER_KEY, MIDTRANS_URL, NODE_ENV } from '@/config';
import { PaymentMethod, Prisma, Role } from '@prisma/client';
import axios, { isAxiosError } from 'axios';

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

  show = async (user_id: string, role: Role, order_id: string) => {
    try {
      if (role !== 'SuperAdmin' && role !== 'OutletAdmin') {
        const user = await prisma.user.findUnique({
          where: {
            user_id,
            Customer: {
              Order: {
                some: {
                  order_id,
                },
              },
            },
          },
        });

        if (!user) throw new ApiError(404, 'User not found, or order not belong to this user');
      }

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
          Payment: true,
        },
      });

      if (!order) throw new ApiError(404, 'Order not found');

      return order;
    } catch (error) {
      throw error;
    }
  };

  payment = async (user_id: string, order_id: string, method: PaymentMethod, receipt_url: string | undefined) => {
    try {
      const order = await prisma.order.findUnique({
        where: {
          order_id,
          Customer: {
            User: {
              user_id,
            },
          },
        },
        include: {
          OrderProgress: true,
          OrderItem: true,
          Customer: {
            include: {
              User: true,
            },
          },
          Payment: true,
        },
      });

      if (!order) throw new ApiError(404, 'Order not found, or not belong to this user');
      if (!order.is_payable) throw new ApiError(400, 'Order cannot be paid, please check your order progress');
      if (order.Payment) throw new ApiError(400, 'Theres already a payment for this order');

      if (method === 'Manual') {
        const updated = await prisma.order.update({
          where: { order_id },
          data: {
            is_payable: false,
            Payment: {
              create: {
                method,
                receipt_url,
                status: 'Paid',
              },
            },
          },
          include: {
            Payment: true,
          },
        });

        return updated.Payment;
      }

      const { data } = await axios.post(
        MIDTRANS_URL,
        {
          transaction_details: {
            order_id,
            gross_amount: Number(order.delivery_fee) + Number(order.laundry_fee),
            item_details: order.OrderItem.map((item) => ({
              id: item.order_item_id,
              quantity: item.quantity,
            })),
            customer_details: {
              first_name: order.Customer.User.fullname,
              email: order.Customer.User.email,
            },
          },
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + Buffer.from(MIDTRANS_SERVER_KEY + ':' + MIDTRANS_PASSWORD).toString('base64'),
          },
        }
      );

      const updated = await prisma.order.update({
        where: { order_id },
        data: {
          is_payable: false,
          Payment: {
            create: {
              method,
              payment_url: data.redirect_url,
              status: 'Paid',
            },
          },
        },
        include: {
          Payment: true,
        },
      });

      return updated.Payment;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new ApiError(
          (error.response && error.response.status) || 500,
          (error.response && error.response.data) || 'Something went wrong'
        );
      }

      throw error;
    }
  };
}
