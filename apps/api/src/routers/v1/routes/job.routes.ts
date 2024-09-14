import { AuthMiddleware } from '@/middlewares/auth.middleware';
import JobController from '@/controllers/job.controller';
import { RoleMiddleware } from '@/middlewares/role.middleware';
import { Router } from 'express';

export default class JobRouter {
  private router: Router;
  private jobController: JobController;
  private roleMiddleware: RoleMiddleware;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.jobController = new JobController();
    this.roleMiddleware = new RoleMiddleware();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.use(this.authMiddleware.header);
    this.router.use(this.roleMiddleware.role(['WashingWorker', 'IroningWorker', 'PackingWorker', 'SuperAdmin']));

    this.router.get('/', this.jobController.index);
    this.router.get('/:job_id', this.jobController.show);
    this.router.put('/:job_id', this.jobController.update);
  }

  getRouter() {
    return this.router;
  }
}
