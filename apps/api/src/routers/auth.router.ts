import { Router } from 'express';
import { validateRegister, validateLogin } from '@/validators/auth.validator';
import { AuthController } from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { uploader } from '@/libs/uploader';

export class AuthRouter {
  private router: Router;
  private path: string;
  private auth: AuthController;
  private guard: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.path = '/auth';
    this.auth = new AuthController();
    this.guard = new AuthMiddleware();

    this.intitalizeRoutes();
  }

  private intitalizeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      uploader('avatar', '/avatar').single('file'),
      validateRegister,
      this.auth.registerController,
    );
    this.router.post(
      `${this.path}/login`,
      validateLogin,
      this.auth.loginController,
    );
    this.router.get(
      `${this.path}/verify`,
      this.guard.verifyEmailToken,
      this.auth.verifyEmailController,
    );
    this.router.post(
      `${this.path}/resend-verification`,
      this.auth.resendVerificationController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
