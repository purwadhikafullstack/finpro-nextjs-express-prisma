import { AuthMiddleware } from '@/middlewares/auth.middleware';
import DeliveryController from '@/controllers/delivery.controller';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';

export default class DeliveryRoutes {
  private router: Router;
  private deliveryController: DeliveryController;
  private roleMiddleware: RoleMiddleware;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.deliveryController = new DeliveryController();
    this.roleMiddleware = new RoleMiddleware();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.use(this.authMiddleware.header);
    this.router.post('/request', this.deliveryController.request);

    this.router.use(this.roleMiddleware.role(['Driver', 'SuperAdmin']));
    this.router.get('/', this.deliveryController.index);
    this.router.post('/', this.deliveryController.create);
    this.router.get('/:delivery_id', this.deliveryController.show);
    this.router.put('/:delivery_id', this.deliveryController.update);
    this.router.delete('/:delivery_id', this.deliveryController.destroy);
  }

  getRouter() {
    return this.router;
  }
}
