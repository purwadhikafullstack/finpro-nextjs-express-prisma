import prisma from '@/prisma';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for generating transaction_id
import {
  ICreateOrder,
  IProcessOrder,
  IOrderStatus,
} from '@/interfaces/order.interface';

class OrderAction {
  // Function to generate a transaction ID with 4 random numbers and 4 random letters
  generateTransactionId = () => {
    // Generate 4 random digits
    const numbers = Array(4)
      .fill(null)
      .map(() => Math.floor(Math.random() * 10)) // Random digit 0-9
      .join('');

    // Generate 4 random uppercase letters
    const letters = Array(4)
      .fill(null)
      .map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))) // Random letter A-Z
      .join('');

    // Combine and return in the desired format
    return `#${numbers}${letters}`;
  };

  // Function to generate a unique transaction ID
  generateUniqueTransactionId = async () => {
    let unique = false;
    let transaction_id = '';

    while (!unique) {
      transaction_id = this.generateTransactionId();

      // Check if the transaction_id already exists in the database
      const existingOrder = await prisma.order.findUnique({
        where: { transaction_id },
      });

      // If no existing order with the same transaction_id, it's unique
      if (!existingOrder) {
        unique = true;
      }
    }

    return transaction_id;
  };

  // Create a new pickup request
  createPickupRequest = async (order: ICreateOrder) => {
    try {
      const { user_id, nearestOutlet, user_address_id } = order;
      // Generate a unique transaction ID
      const transaction_id = await this.generateUniqueTransactionId();
      const newOrder = await prisma.order.create({
        data: {
          transaction_id: transaction_id,
          customer_id: user_id,
          user_address_id: user_address_id,
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
          transaction_id: true,
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
