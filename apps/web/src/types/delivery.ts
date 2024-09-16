import { ProgressType } from '@/types/shared';

export type DeliveryType = 'Pickup' | 'Dropoff';

export type Delivery = {
  delivery_id: string;
  outlet_id: string;
  employee_id: string;
  progress: ProgressType;
  type: DeliveryType;
  created_at: string;
  updated_at: string;
};
