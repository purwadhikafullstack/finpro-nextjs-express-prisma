import AuthRouter from '@/routers/v1/routes/auth.routes';
import OutletsRouter from './routes/outltes.routes';
import ProfileRouter from '@/routers/v1/routes/profile.routes';
import { Router } from 'express';

export default class IndexRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const routes = {
      auth: new AuthRouter(),
      profile: new ProfileRouter(),
      outlets: new OutletsRouter(),
    };

    this.router.use('/auth', routes.auth.getRouter());
    this.router.use('/profile', routes.profile.getRouter());
    this.router.use('/outlets', routes.outlets.getRouter());
  }

  getRouter(): Router {
    return this.router;
  }
}
