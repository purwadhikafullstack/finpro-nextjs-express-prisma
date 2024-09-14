import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiResponse from '@/utils/response.util';
import OrderAction from '@/actions/order.action';

export default class OrderController {
  private orderAction: OrderAction;

  constructor() {
    this.orderAction = new OrderAction();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, role } = req.user as AccessTokenPayload;

      const { page, limit, id, value, key, desc } = await yup
        .object({
          page: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? 1 : value))
            .min(1)
            .required(),
          limit: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? 10 : value))
            .min(1)
            .max(100)
            .required(),
          id: yup.string().optional(),
          value: yup.string().optional(),
          key: yup.string().optional(),
          desc: yup.string().optional(),
        })
        .validate(req.query);

      const [orders, count] = await this.orderAction.index(user_id, role, page, limit, id, value, key, desc);

      return res.status(200).json(
        new ApiResponse('Orders retrieved successfully', {
          orders: orders || [],
          count: count || 0,
        })
      );
    } catch (error) {
      return next(error);
    }
  };

  customer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { type } = await yup
        .object({
          type: yup.string().oneOf(['All', 'Ongoing', 'Completed']).optional(),
        })
        .validate(req.query);

      const orders = await this.orderAction.customer(user_id, type);

      return res.status(200).json(new ApiResponse('Customer orders retrieved successfully', orders));
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_id } = await yup
        .object({
          order_id: yup.string().required(),
        })
        .validate(req.params);

      const order = await this.orderAction.show(order_id);

      return res.status(200).json(new ApiResponse('Order retrieved successfully', order));
    } catch (error) {
      next(error);
    }
  };
}
