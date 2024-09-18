import { NextFunction } from 'express';

export default class PaymentAction {
  callback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };
}
