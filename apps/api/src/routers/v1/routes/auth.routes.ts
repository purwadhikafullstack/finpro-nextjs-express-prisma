import * as yup from 'yup';

import { AccessTokenPayload } from '@/type/jwt';
import AuthController from '@/controllers/auth.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Role } from '@prisma/client';
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

    this.router.post('/guard', this.authMiddleware.header, async (req, res) => {
      const { role } = req.user as AccessTokenPayload;

      const { allowed } = await yup
        .object({
          allowed: yup
            .array()
            .of(yup.string().oneOf(Object.values(Role)))
            .required(),
        })
        .validate(req.body);

      if (role === 'SuperAdmin') {
        return res.status(200).json({
          protected: false,
        });
      }

      return res.status(200).json({
        protected: !allowed.includes(role),
      });
    });
  }

  getRouter(): Router {
    return this.router;
  }
}
