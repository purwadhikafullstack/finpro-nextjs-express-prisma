import AddressController from '@/controllers/address.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import OrderController from '@/controllers/order.controller';
import ProfileController from '@/controllers/profile.controller';
import { Router } from 'express';

export default class ProfileRouter {
  private router: Router;
  private profileController: ProfileController;
  private addressController: AddressController;
  private authMiddleware: AuthMiddleware;
  private orderController: OrderController;

  constructor() {
    this.router = Router();

    this.authMiddleware = new AuthMiddleware();
    this.profileController = new ProfileController();
    this.addressController = new AddressController();
    this.orderController = new OrderController();

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.authMiddleware.header);

    this.router.get('/', this.profileController.show);
    this.router.put('/', this.profileController.update);
    this.router.post('/change-password', this.profileController.changePassword);
    this.router.post('/change-email', this.profileController.changeEmail);

    this.router.get('/orders', this.orderController.customer);
    this.router.get('/orders/:order_id', this.orderController.show);
    this.router.post('/orders/:order_id/payment', this.orderController.payment);

    this.router.get('/addresses', this.addressController.customer);
    this.router.post('/addresses', this.addressController.create);
    this.router.put('/addresses/:customer_address_id/set-primary', this.addressController.primary);
  }

  getRouter(): Router {
    return this.router;
  }
}
