import { Router } from 'express';

export interface IRouter {
  path?: string;
  router: Router;
}
