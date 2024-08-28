import prisma from '@/prisma';
import {
  ICreateOrder,
  IProcessOrder,
  IOrderStatus,
} from '@/interfaces/order.interface';

class OrderAction {

  // Create a new pickup request
  createPickupRequest = async (order: ICreateOrder) => {
    try {
      const { user_id, nearestOutlet } = order;

      // Create a new order in pending status
      const newOrder = await prisma.order.create({
        data: {
          customer_id: user_id,
          outlet_id: nearestOutlet,
          driver_id: 0,
          status: 'Menunggu Penjemputan Driver',
          total_weight: 0,
          total_cost: 0,
        },
      });

      return newOrder;
    } catch (error) {
      throw error;
    }
  };

  // Driver can pick up the order
  pickupOrder = async (order_id: number, driver_id: number) => {
    try {
      const updatedOrder = await prisma.order.update({
        where: { order_id },
        data: {
          driver_id,
          status: 'Laundry Sedang Menuju Outlet',
        },
      });

      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  // Admin creates an order and inputs item details
  processOrder = async (data: IProcessOrder) => {
    try {
      const { order_id, items, total_weight, total_cost } = data;

      // Update the order status to "Laundry Telah Sampai Outlet"
      const updatedOrder = await prisma.order.update({
        where: { order_id },
        data: {
          status: 'Laundry Telah Sampai Outlet',
          total_weight,
          total_cost,
        },
      });

      // Insert items into the OrderItem table
      for (const item of items) {
        await prisma.orderItem.create({
          data: {
            order_id,
            item_id: item.item_id,
            quantity: item.quantity,
          },
        });
      }

      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  // List orders for a customer
  getOrdersForCustomer = async (customer_id: number) => {
    try {
      const orders = await prisma.order.findMany({
        where: { customer_id },
        orderBy: {
          created_at: 'desc',
        },
        include: {
          OrderItems: true,
          Payments: true,
        },
      });

      return orders;
    } catch (error) {
      throw error;
    }
  };

  // Auto-confirm the order after 2 days
  autoConfirmOrder = async (order_id: number) => {
    try {
      const currentTime = new Date();

      const order = await prisma.order.findUnique({
        where: { order_id },
        include: { Payments: true },
      });

      const orderTime = order?.updated_at;

      // Check if 2 days have passed since the order was delivered
      if (
        orderTime &&
        currentTime.getTime() - orderTime.getTime() >= 2 * 24 * 60 * 60 * 1000
      ) {
        const updatedOrder = await prisma.order.update({
          where: { order_id },
          data: { status: 'Laundry Telah Diterima Customer' },
        });

        return updatedOrder;
      }

      throw new Error('Auto-confirmation time has not been reached');
    } catch (error) {
      throw error;
    }
  };

  // Get the list of orders and their statuses for the customer
  getOrderStatusList = async (customer_id: number): Promise<IOrderStatus[]> => {
    try {
      const orders = await prisma.order.findMany({
        where: { customer_id },
        select: {
          order_id: true,
          status: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return orders;
    } catch (error) {
      throw error;
    }
  };
}

export default new OrderAction();
