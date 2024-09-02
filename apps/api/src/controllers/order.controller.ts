import { Request, Response, NextFunction } from 'express';
import { ICreateOrder, IProcessOrder } from '@/interfaces/order.interface';
import OrderAction from '@/actions/order.action';

export class OrderController {
  // Handle creating a pickup request
  createPickupRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user_id, user_address_id, nearestOutlet }: ICreateOrder = req.body;

      const newOrder = await OrderAction.createPickupRequest({
        user_id,
        user_address_id,
        nearestOutlet,
      });

      return res.status(201).json({
        message: 'Pickup request created successfully',
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle driver picking up an order
  pickupOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_id, driver_id } = req.body;

      const updatedOrder = await OrderAction.pickupOrder(order_id, driver_id);

      return res.status(200).json({
        message: 'Order picked up successfully',
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle processing an order and inputting item details
  processOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_id, items, total_weight, total_cost }: IProcessOrder =
        req.body;

      const updatedOrder = await OrderAction.processOrder({
        order_id,
        items,
        total_weight,
        total_cost,
      });

      return res.status(200).json({
        message: 'Order processed successfully',
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle fetching all orders for a customer
  getOrdersForCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { customer_id } = req.params;

      const orders = await OrderAction.getOrdersForCustomer(
        Number(customer_id),
      );

      return res.status(200).json({
        message: 'Orders fetched successfully',
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle auto-confirming an order after 2 days
  autoConfirmOrder = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { order_id } = req.params;

      const updatedOrder = await OrderAction.autoConfirmOrder(Number(order_id));

      return res.status(200).json({
        message: 'Order auto-confirmed successfully',
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  // Handle fetching the status of all orders for a customer
  getOrderStatusList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { customer_id } = req.params;

      const orderStatuses = await OrderAction.getOrderStatusList(
        Number(customer_id),
      );

      return res.status(200).json({
        message: 'Order statuses fetched successfully',
        data: orderStatuses,
      });
    } catch (error) {
      next(error);
    }
  };
}
