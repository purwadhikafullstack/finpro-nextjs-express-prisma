export type OrderStatus =
  | 'WAITING_FOR_PICKUP'
  | 'ON_PROGRESS_PICKUP'
  | 'ARRIVED_AT_OUTLET'
  | 'ON_PROGRESS_WASHING'
  | 'ON_PROGRESS_IRONING'
  | 'ON_PROGRESS_PACKING'
  | 'WAITING_FOR_PAYMENT'
  | 'ON_PROGRESS_DROPOFF'
  | 'COMPLETED_ORDER';

export type OrderProgress = {
  order_progrses_id: string;
  order_id: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type Order = {
  order_id: string;
  outlet_id: string;
  customer_id: string;
  customer_address_id: string;
  weight: number;
  delivery_fee: number;
  laundry_fee: number;
  is_completed: boolean;
  is_payable: boolean;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  order_item_id: string;
  order_id: string;
  laundry_item_id: string;
  quantity: number;
  weight: number;
};
