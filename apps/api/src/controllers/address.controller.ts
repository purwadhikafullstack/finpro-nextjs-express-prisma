import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import AddressAction from '@/actions/address.action';
import ApiResponse from '@/utils/api.response';

export default class AddressController {
  private addressAction: AddressAction;

  constructor() {
    this.addressAction = new AddressAction();
  }

  customer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const addresses = await this.addressAction.customer(user_id);

      return res.status(200).json(new ApiResponse('Customer addresses retrieved successfully', addresses));
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id } = req.user as AccessTokenPayload;

      const { name, address, latitude, longitude } = await yup
        .object({
          name: yup.string().required(),
          address: yup.string().required(),
          latitude: yup.number().required(),
          longitude: yup.number().required(),
        })
        .validate(req.body);

      const created = await this.addressAction.create(user_id, name, address, latitude, longitude);

      return res.status(201).json(new ApiResponse('Address created successfully', created));
    } catch (error) {
      next(error);
    }
  };
}
