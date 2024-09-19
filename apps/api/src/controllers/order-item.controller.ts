import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import ApiResponse from '@/utils/response.util';
import OrderItemAction from '@/actions/order-item.action';

export default class OrderItemController {
  private orderItemAction: OrderItemAction;

  constructor() {
    this.orderItemAction = new OrderItemAction();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_id } = await yup
        .object({
          order_id: yup.string().required(),
        })
        .validate(req.params);

      const { order_items, weight } = await yup
        .object({
          order_items: yup
            .array(
              yup
                .object({
                  name: yup.string().required(),
                  quantity: yup.number().required(),
                  laundry_item_id: yup.string().required(),
                })
                .required()
            )
            .required(),
          weight: yup.number().min(1, 'Minimum weight is 1kg').required(),
        })
        .validate(req.body);

      const created = await this.orderItemAction.create(order_id, order_items, weight);

      return res.status(201).json(new ApiResponse('Order items created successfully', created));
    } catch (error) {
      next(error);
    }
  };
}
