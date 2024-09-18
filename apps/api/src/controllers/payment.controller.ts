import { NextFunction, Request, Response } from 'express';

import PaymentAction from '@/actions/payment.action';

export default class PaymentController {
  private paymentAction: PaymentAction;

  constructor() {
    this.paymentAction = new PaymentAction();
  }

  callback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };
}
