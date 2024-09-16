import AuthRouter from '@/routers/v1/routes/auth.routes';
import DeliveryRoutes from './routes/delivery.routes';
import JobRouter from './routes/job.routes';
import LaundryItemRouter from './routes/laundry-item.routes';
import OrderRouter from './routes/order.routes';
import OutletsRouter from './routes/outlet.routes';
import ProfileRouter from '@/routers/v1/routes/profile.routes';
import { Router } from 'express';
import userRouter from './routes/user.routes';

export default class IndexRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const routes = {
      auth: new AuthRouter(),
      users: new userRouter(),
      profile: new ProfileRouter(),
      outlets: new OutletsRouter(),
      orders: new OrderRouter(),
      deliveries: new DeliveryRoutes(),
      laundryItems: new LaundryItemRouter(),
      jobs: new JobRouter(),
    };

    this.router.use('/auth', routes.auth.getRouter());
    this.router.use('/users', routes.users.getRouter());
    this.router.use('/profile', routes.profile.getRouter());
    this.router.use('/outlets', routes.outlets.getRouter());
    this.router.use('/orders', routes.orders.getRouter());
    this.router.use('/deliveries', routes.deliveries.getRouter());
    this.router.use('/laundry-items', routes.laundryItems.getRouter());
    this.router.use('/jobs', routes.jobs.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
