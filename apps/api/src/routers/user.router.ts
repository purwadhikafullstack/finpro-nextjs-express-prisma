import { Router } from 'express';
import { uploader } from '@/libs/uploader';
import { validateUserUpdate } from '@/validators/user.validator';
import { UserController } from '@/controllers/user.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRouter {
  private router: Router;
  private path: string;
  private userController: UserController;
  private guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = '/user';
    this.userController = new UserController();
    this.guard = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // get all users
    this.router.get(`/users`, this.userController.getUsersController);

    // fetch specific user info, passing { id } from jwt then return user data
    this.router.get(
      `${this.path}/profile`,
      this.guard.verifyAccessToken,
      this.userController.findSelfByIdController,
    );

    // for updating user profile, passing { id } from jwt and data in body then return user data
    this.router.patch(
      `${this.path}/profile-update`,
      validateUserUpdate,
      this.guard.verifyAccessToken,
      uploader('avatar', '/avatar').single('file'),
      this.userController.updateUserController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
