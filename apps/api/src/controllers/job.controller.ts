import * as yup from 'yup';

import { NextFunction, Request, Response } from 'express';

import { AccessTokenPayload } from '@/type/jwt';
import ApiResponse from '@/utils/response.util';
import JobAction from '@/actions/job.action';
import { ProgressType } from '@prisma/client';

export default class JobController {
  private jobAction: JobAction;

  constructor() {
    this.jobAction = new JobAction();
  }

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, role } = req.user as AccessTokenPayload;

      const { page, limit, id, value, key, desc } = await yup
        .object({
          page: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? 1 : value))
            .min(1)
            .required(),
          limit: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? 10 : value))
            .min(1)
            .max(100)
            .required(),
          id: yup.string().optional(),
          value: yup.string().optional(),
          key: yup.string().optional(),
          desc: yup.string().optional(),
        })
        .validate(req.query);

      const [jobs, count] = await this.jobAction.index(user_id, role, page, limit, id, value, key, desc);

      return res.status(200).json(
        new ApiResponse('Jobs retrieved successfully', {
          jobs: jobs || [],
          count: count || 0,
        })
      );
    } catch (error) {
      return next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { job_id } = await yup
        .object({
          job_id: yup.string().required(),
        })
        .validate(req.params);

      const job = await this.jobAction.show(job_id);

      return res.status(200).json(new ApiResponse('Job retrieved successfully', job));
    } catch (error) {
      return next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, role } = req.user as AccessTokenPayload;

      const { job_id } = await yup
        .object({
          job_id: yup.string().required(),
        })
        .validate(req.params);

      const { progress } = await yup
        .object({
          progress: yup.string().oneOf(Object.values(ProgressType)).required(),
        })
        .validate(req.body);

      const job = await this.jobAction.update(
        user_id,
        role as 'SuperAdmin' | 'WashingWorker' | 'IroningWorker' | 'PackingWorker',
        job_id,
        progress
      );

      return res.status(200).json(new ApiResponse('Job updated successfully', job));
    } catch (error) {
      return next(error);
    }
  };
}
