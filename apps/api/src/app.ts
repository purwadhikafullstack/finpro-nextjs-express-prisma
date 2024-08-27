import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { UserRouter } from './routers/user.router';
import './libs/passport';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    // Setup session middleware
    this.app.use(
      session({
        secret: 'your_secret_key', // Ganti dengan secret key yang lebih aman di production
        resave: false,
        saveUninitialized: true,
      }),
    );

    // Initialize passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private handleError(): void {
    this.app.use(ErrorMiddleware);
  }

  private routes(): void {
    const routers = [new AuthRouter(), new UserRouter()];

    routers.forEach((router) => {
      this.app.use('/api', router.getRouter());
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
