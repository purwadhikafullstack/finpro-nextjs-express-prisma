import AddressController from '@/controllers/address.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import ProfileController from '@/controllers/profile.controller';
import { Router } from 'express';

export default class ProfileRouter {
  private router: Router;
  private profileController: ProfileController;
  private addressController: AddressController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();

    this.profileController = new ProfileController();
    this.addressController = new AddressController();
    this.authMiddleware = new AuthMiddleware();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);

    this.router.get('/', this.profileController.show);
    this.router.put('/', this.profileController.update);
    this.router.get('/addresses', this.addressController.customer);
    this.router.post('/addresses', this.addressController.create);
  }

  getRouter(): Router {
    return this.router;
  }
}
