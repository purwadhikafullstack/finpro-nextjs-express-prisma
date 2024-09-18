import PaymentController from '@/controllers/payment.controller';
import { Router } from 'express';

export default class PaymentRouter {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.router = Router();
    this.paymentController = new PaymentController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/payment/callback', this.paymentController.callback);
  }

  getRouter() {
    return this.router;
  }
}
