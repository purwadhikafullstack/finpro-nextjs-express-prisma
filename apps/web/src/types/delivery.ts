export type DeliveryType = 'Pickup' | 'Dropoff';

export type ProgressType = 'Pending' | 'Ongoing' | 'Completed';

export type Delivery = {
  delivery_id: string;
  outlet_id: string;
  employee_id: string;
  progrses: ProgressType;
  type: DeliveryType;
  created_at: string;
  updated_at: string;
};
