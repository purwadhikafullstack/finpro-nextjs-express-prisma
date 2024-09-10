import AuthController from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { options } from '@/libs/passport';
import passport from 'passport';

export default class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/login', this.authController.login);
    this.router.post('/register', this.authController.register);
    this.router.get('/verify', this.authMiddleware.query, this.authController.verify);
    this.router.post('/set-password', this.authMiddleware.body, this.authController.setPassword);
    this.router.post('/logout', this.authController.logout);
    this.router.post('/refresh', this.authMiddleware.cookie, this.authController.refresh);
    this.router.get('/google', passport.authenticate('google', options));
    this.router.get('/google/callback', passport.authenticate('google', options), this.authController.callback);
  }

  getRouter(): Router {
    return this.router;
  }
}
