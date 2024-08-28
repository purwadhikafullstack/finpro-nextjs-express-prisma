import { OrderController } from '@/controllers/order.controller';
import { Router } from 'express';

export class OrderRouter {
  public router: Router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Order routes
    this.router.post('/order/pickupRequest', this.orderController.createPickupRequest);
    this.router.post('/order/pickupOrder', this.orderController.pickupOrder);
    this.router.post('/order/process', this.orderController.processOrder);
    this.router.get(
      '/orders/:customer_id',
      this.orderController.getOrdersForCustomer,
    );
    this.router.post(
      '/order/auto-confirm/:order_id',
      this.orderController.autoConfirmOrder,
    );
    this.router.get(
      '/orders/status/:customer_id',
      this.orderController.getOrderStatusList,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
