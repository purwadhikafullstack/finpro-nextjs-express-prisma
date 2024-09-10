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
    this.router.get('/', this.outletsController.index);
    this.router.get('/:outlet_id', this.outletsController.show);
  }

  getRouter(): Router {
    return this.router;
  }
}
