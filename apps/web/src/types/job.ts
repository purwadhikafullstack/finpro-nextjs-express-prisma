import { ProgressType } from '@/types/shared';

export type JobType = 'Washing' | 'Ironing' | 'Packing';

export type Job = {
  job_id: string;
  outlet_id: string;
  order_id: string;
  progress: ProgressType;
  type: JobType;
  created_at: string;
  updated_at: string;
};
