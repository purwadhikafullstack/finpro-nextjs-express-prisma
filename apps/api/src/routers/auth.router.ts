import { Router } from 'express';
import { validateRegister, validateLogin } from '@/validators/auth.validator';
import { AuthController } from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { uploader } from '@/libs/uploader';
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
      this.guard.verifyEmailToken, // Middleware untuk memverifikasi token
      this.auth.setPasswordController, // Controller untuk set password
    );

    this.router.post(
      `${this.path}/refresh`,
      this.guard.verifyAccessToken2,
      this.auth.refreshTokenController,
    );

    // // Google login routes
    // this.router.get(
    //   `${this.path}/google`,
    //   passport.authenticate('google', { scope: ['profile', 'email'] }),
    // );

    // this.router.get(
    //   `${this.path}/google/callback`,
    //   passport.authenticate('google', {
    //     successRedirect: process.env.FE_BASE_URL, // Redirect jika sukses
    //     failureRedirect: '/login', // Redirect jika gagal
    //   }),
    // );

    // Google login routes
    this.router.get(
      `${this.path}/google`,
      passport.authenticate('google', { scope: ['profile', 'email'] }),
    );

    this.router.get(
      `${this.path}/google/callback`,
      this.auth.googleCallbackController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
