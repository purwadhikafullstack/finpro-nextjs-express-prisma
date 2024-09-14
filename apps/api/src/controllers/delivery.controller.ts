import * as yup from 'yup';

import { DeliveryType, ProgressType } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiResponse from '@/utils/response.util';
import DeliveryAction from '@/actions/delivery.action';

export default class DeliveryController {
  private deliveryAction: DeliveryAction;

  constructor() {
    this.deliveryAction = new DeliveryAction();
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

      const [deliveries, count] = await this.deliveryAction.index(user_id, role, page, limit, id, value, key, desc);

      return res.status(200).json(
        new ApiResponse('Deliveries retrieved successfully', {
          deliveries: deliveries || [],
          count: count || 0,
        })
      );
    } catch (error) {
      return next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { delivery_id } = await yup
        .object({
          delivery_id: yup.string().required(),
        })
        .validate(req.query);

      const delivery = await this.deliveryAction.show(delivery_id);

      return res.status(200).json(new ApiResponse('Delivery retrieved successfully', delivery));
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_id, outlet_id, type } = await yup
        .object({
          order_id: yup.string().required(),
          outlet_id: yup.string().required(),
          type: yup.string().oneOf(Object.values(ProgressType)).required(),
        })
        .validate(req.body);

      const delivery = await this.deliveryAction.create(order_id, outlet_id, type as DeliveryType);

      return res.status(201).json(new ApiResponse('Delivery created successfully', delivery));
    } catch (error) {
      return next(error);
    }
  };

  request = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { customer_address_id, outlet_id } = await yup
        .object({
          customer_address_id: yup.string().required(),
          outlet_id: yup.string().required(),
        })
        .validate(req.body);

      await this.deliveryAction.request(user_id, customer_address_id, outlet_id);

      return res.status(201).json(new ApiResponse('Delivery created successfully'));
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, role } = req.user as AccessTokenPayload;

      const { delivery_id } = await yup
        .object({
          delivery_id: yup.string().required(),
        })
        .validate(req.params);

      const { progress } = await yup
        .object({
          progress: yup.string().oneOf(Object.values(ProgressType)).required(),
        })
        .validate(req.body);

      const delivery = await this.deliveryAction.update(
        user_id,
        role as 'SuperAdmin' | 'Driver',
        delivery_id,
        progress
      );

      return res.status(200).json(new ApiResponse('Delivery updated successfully', delivery));
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { delivery_id } = await yup
        .object({
          delivery_id: yup.string().required(),
        })
        .validate(req.query);

      const delivery = await this.deliveryAction.destroy(delivery_id);

      return res.status(200).json(new ApiResponse('Delivery deleted successfully', delivery));
    } catch (error) {
      return next(error);
    }
  };
}
