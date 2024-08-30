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
    this.router.post(
      '/order/pickup-request',
      this.orderController.createPickupRequest,
    );
    this.router.post('/order/pickup', this.orderController.pickupOrder);
    this.router.post('/order/process', this.orderController.processOrder);
    this.router.get(
      '/customers/:customer_id/orders',
      this.orderController.getOrdersForCustomer,
    );
    this.router.post(
      '/order/auto-confirm/:order_id',
      this.orderController.autoConfirmOrder,
    );
    this.router.get(
      '/customers/:customer_id/order-statuses',
      this.orderController.getOrderStatusList,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
