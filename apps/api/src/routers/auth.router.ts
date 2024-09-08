import { Router } from 'express';
import {
  validateRegister,
  validateLogin,
  validateAgentRegister,
  validateAgentLogin,
} from '@/validators/auth.validator';
import { AuthController } from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import passport from 'passport';

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
      validateRegister,
      this.auth.registerWithEmailController,
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

    this.router.post(
      `${this.path}/set-password`,
      this.guard.verifyEmailToken,
      this.auth.setPasswordController,
    );

    this.router.post(
      `${this.path}/refresh`,
      this.guard.verifyRefreshToken,
      this.auth.refreshTokenController,
    );

    this.router.post(
      `${this.path}/change-password`,
      this.guard.verifyAccessToken,
      this.auth.changePasswordController,
    );

    // Google login routes
    this.router.get(
      `${this.path}/google`,
      passport.authenticate('google', { scope: ['profile', 'email'] }),
    );

    this.router.get(
      `${this.path}/google/callback`,
      this.auth.googleCallbackController,
    );

    // ======================================== NON-USER ROUTER ========================================

    this.router.post(
      `${this.path}/register-agent`,
      this.guard.verifyAgentAccessToken,
      this.guard.authorizeRoles(['admin', 'super-admin']),
      validateAgentRegister,
      this.auth.createAgentController,
    );

    this.router.post(
      `${this.path}/login-agent`,
      validateAgentLogin,
      this.auth.loginAgentController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
