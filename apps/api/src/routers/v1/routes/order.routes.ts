import { AuthMiddleware } from '@/middlewares/auth.middleware';
import OrderController from '@/controllers/order.controller';
import OrderItemController from '@/controllers/order-item.controller';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';

export default class OrderRouter {
  private router: Router;
  private roleMiddleware: RoleMiddleware;
  private authMiddleware: AuthMiddleware;
  private orderController: OrderController;
  private orderItemController: OrderItemController;

  constructor() {
    this.router = Router();
    this.roleMiddleware = new RoleMiddleware();
    this.authMiddleware = new AuthMiddleware();
    this.orderController = new OrderController();
    this.orderItemController = new OrderItemController();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);
    this.router.use(this.roleMiddleware.role(['OutletAdmin', 'SuperAdmin']));

    this.router.get('/', this.orderController.index);
    // this.router.post('/', this.orderController.create);
    this.router.get('/:order_id', this.orderController.show);
    // this.router.put('/:order_id', this.orderController.update);
    // this.router.delete('/:order_id', this.orderController.destroy);

    this.router.post('/:order_id/items', this.orderItemController.create);
  }

  getRouter(): Router {
    return this.router;
  }
}
