import { PORT, validateEnv } from '@/config';
import express, { Express, NextFunction, Request, Response } from 'express';

import ApiError from '@/utils/error.util';
import PassportConfig from './libs/passport';
import { ValidationError } from 'yup';
import cookie from 'cookie-parser';
import cors from 'cors';
import v1Router from '@/routers/v1/index.routes';

export default class App {
  private app: Express;
  private passport: PassportConfig;

  constructor() {
    this.app = express();
    this.passport = new PassportConfig();

    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );
    this.app.use(cookie());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.passport.initialize();
  }

  private routes(): void {
    const v1 = new v1Router();

    this.app.get('/_debug/healthcheck', (req: Request, res: Response) => {
      res.send('OK');
    });

    this.app.use('/api/v1', v1.getRouter());
  }

  private handleError(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof ApiError) {
        return res.status(err.status).json({
          message: err.message,
        });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({
          ...err,
        });
      }

      console.error('Error : ', err.stack);
      res.status(500).send('Error !');
    });
  }

  public start(): void {
    validateEnv()
      .then(() => {
        this.app.listen(PORT, () => {
          console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
        });
      })
      .catch((error) => {
        console.error('Environment variables are not valid', error.message);
      });
  }
}
