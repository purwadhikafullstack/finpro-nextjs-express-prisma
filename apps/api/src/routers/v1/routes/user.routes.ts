import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';
import UsersController from '@/controllers/users.controller';

export default class userRouter {
  private router: Router;
  private userController: UsersController;
  private roleMiddleware: RoleMiddleware;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.roleMiddleware = new RoleMiddleware();
    this.userController = new UsersController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);
    this.router.use(this.roleMiddleware.role('SuperAdmin'));

    this.router.get('/', this.userController.index);
    this.router.post('/', this.userController.create);
    this.router.get('/search', this.userController.search);
    this.router.get('/:user_id', this.userController.show);
    this.router.put('/:user_id', this.userController.update);
    this.router.delete('/:user_id', this.userController.destroy);
  }

  getRouter(): Router {
    return this.router;
  }
}
