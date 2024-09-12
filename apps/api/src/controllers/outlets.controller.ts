import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import ApiResponse from '@/utils/response.util';
import OutletsAction from '@/actions/outlets.action';
import { Role } from '@prisma/client';

export default class OutletsController {
  private outletsAction: OutletsAction;

  constructor() {
    this.outletsAction = new OutletsAction();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
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

      const [outlets, count] = await this.outletsAction.index(page, limit, id, value, key, desc);

      return res.status(200).json(
        new ApiResponse('Outlets retrieved successfully', {
          outlets: outlets || [],
          count: count || 0,
        })
      );
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { outlet_id } = await yup
        .object({
          outlet_id: yup.string().required(),
        })
        .validate(req.query);

      const outlet = await this.outletsAction.show(outlet_id);

      return res.status(200).json(new ApiResponse('Outlet retrieved successfully', outlet));
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, address, latitude, longitude, employees } = await yup
        .object({
          name: yup.string().required(),
          description: yup.string().required(),
          address: yup.string().required(),
          latitude: yup.number().required(),
          longitude: yup.number().required(),
          employees: yup
            .array(
              yup.object({
                user_id: yup.string().required(),
                email: yup.string().required(),
                fullname: yup.string().required(),
                role: yup.string().oneOf(Object.values(Role)).required(),
              })
            )
            .required(),
        })
        .validate(req.body);

      const created = await this.outletsAction.create(name, description, address, latitude, longitude, employees);

      return res.status(201).json(new ApiResponse('Outlet created successfully', created));
    } catch (error) {
      next(error);
    }
  };

  nearest = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { customer_address_id } = await yup
        .object({
          customer_address_id: yup.string().required(),
        })
        .validate(req.query);

      const outlets = await this.outletsAction.nearest(customer_address_id);

      return res.status(200).json(
        new ApiResponse(
          'Outlets retrieved successfully',
          outlets.map((outlet) => ({
            outlet,
            distance: Math.random() * 100,
          }))
        )
      );
    } catch (error) {
      next(error);
    }
  };
}
