import { AuthMiddleware } from '@/middlewares/auth.middleware';
import OutletsController from '@/controllers/outlets.controller';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';

export default class OutletsRouter {
  private router: Router;
  private outletsController: OutletsController;
  private authMiddleware: AuthMiddleware;
  private roleMiddleware: RoleMiddleware;

  constructor() {
    this.router = Router();
    this.outletsController = new OutletsController();
    this.authMiddleware = new AuthMiddleware();
    this.roleMiddleware = new RoleMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);
    this.router.get('/nearest', this.outletsController.nearest);

    this.router.use(this.roleMiddleware.role(['SuperAdmin']));
    this.router.get('/', this.outletsController.index);
    this.router.post('/', this.outletsController.create);
    this.router.get('/:outlet_id', this.outletsController.show);
    this.router.put('/:outlet_id', this.outletsController.update);
  }

  getRouter(): Router {
    return this.router;
  }
}
