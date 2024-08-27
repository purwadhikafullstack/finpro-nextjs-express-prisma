import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRouter {
  private router: Router;
  private userController: UserController;
  private guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.guard = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/user/:email',
      this.guard.verifyAccessToken,
      this.userController.getUsersController,
    );
    this.router.get('/users', this.userController.getUsersController);
  }

  getRouter(): Router {
    return this.router;
  }
}
