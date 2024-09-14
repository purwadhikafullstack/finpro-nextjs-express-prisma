import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import ApiResponse from '@/utils/response.util';
import LaundryItemAction from '@/actions/laundry-item.action';

export default class LaundryItemController {
  private laundryItemAction: LaundryItemAction;

  constructor() {
    this.laundryItemAction = new LaundryItemAction();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.laundryItemAction.index();

      return res.status(200).json(new ApiResponse('Laundry Items retrieved successfully', items));
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { laundry_item_id } = await yup
        .object({
          laundry_item_id: yup.string().required(),
        })
        .validate(req.query);

      const item = await this.laundryItemAction.show(laundry_item_id);

      return res.status(200).json(new ApiResponse('Laundry Item retrieved successfully', item));
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, icon_url } = await yup
        .object({
          name: yup.string().required(),
          icon_url: yup.string().optional(),
        })
        .validate(req.body);

      const created = await this.laundryItemAction.create(name, icon_url);

      return res.status(201).json(new ApiResponse('Laundry Item created successfully', created));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { laundry_item_id } = await yup
        .object({
          laundry_item_id: yup.string().required(),
        })
        .validate(req.query);

      const { name, icon_url } = await yup
        .object({
          name: yup.string().required(),
          icon_url: yup.string().optional(),
        })
        .validate(req.body);

      const updated = await this.laundryItemAction.update(laundry_item_id, name, icon_url);

      return res.status(200).json(new ApiResponse('Laundry Item updated successfully', updated));
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { laundry_item_id } = await yup
        .object({
          laundry_item_id: yup.string().required(),
        })
        .validate(req.query);

      const item = await this.laundryItemAction.destroy(laundry_item_id);

      return res.status(200).json(new ApiResponse('Laundry Item deleted successfully', item));
    } catch (error) {
      next(error);
    }
  };
}
