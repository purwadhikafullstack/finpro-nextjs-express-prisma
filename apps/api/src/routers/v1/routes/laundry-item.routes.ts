import { AuthMiddleware } from '@/middlewares/auth.middleware';
import LaundryItemController from '@/controllers/laundry-item.controller';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';

export default class LaundryItemRouter {
  private router: Router;
  private laundryItemController: LaundryItemController;
  private roleMiddleware: RoleMiddleware;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.laundryItemController = new LaundryItemController();
    this.roleMiddleware = new RoleMiddleware();
    this.authMiddleware = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);
    this.router.use(
      this.roleMiddleware.role([
        'SuperAdmin',
        'Driver',
        'OutletAdmin',
        'IroningWorker',
        'PackingWorker',
        'WashingWorker',
      ])
    );
    this.router.get('/', this.laundryItemController.index);

    this.router.use(this.roleMiddleware.role(['SuperAdmin']));
    this.router.post('/', this.laundryItemController.create);
    this.router.get('/:laundry_item_id', this.laundryItemController.show);
    this.router.put('/:laundry_item_id', this.laundryItemController.update);
    this.router.delete('/:laundry_item_id', this.laundryItemController.destroy);
  }

  getRouter(): Router {
    return this.router;
  }
}
