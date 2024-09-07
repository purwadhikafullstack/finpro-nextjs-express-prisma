import { Router } from 'express';
import { UserAddressController } from '@/controllers/userAddress.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserAddressRouter {
  private router: Router;
  private path: string;
  private UserAddressController: UserAddressController;
  private guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = '/user';
    this.UserAddressController = new UserAddressController();
    this.guard = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // fetch specific user addresses, passing { id } from jwt then return user data
    this.router.get(
      `${this.path}/address`,
      this.guard.verifyAccessToken,
      this.UserAddressController.getAddressController,
    );

    this.router.post(
      `${this.path}/address`,
      this.guard.verifyAccessToken,
      this.UserAddressController.createAddressController,
    );

    // Update specific user address
    this.router.patch(
      `${this.path}/address/:address_id`,
      this.guard.verifyAccessToken,
      this.UserAddressController.updateAddressController,
    );

    // Route untuk delete address
    this.router.delete(
      `${this.path}/address/:address_id`,
      this.guard.verifyAccessToken,
      this.UserAddressController.deleteAddressController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
