import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export default class RequestRouter {
  private router: Router;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);
    this.router.get('/', this.authMiddleware.query);
  }

  getRouter(): Router {
    return this.router;
  }
}
