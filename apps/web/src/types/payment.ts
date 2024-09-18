export type PaymentMethod = 'PaymentGateway' | 'Manual';

export type PaymentStatus = 'Pending' | 'Paid' | 'Cancelled' | 'Refunded';

export type Payment = {
  payment_id: string;
  order_id: string;
  method: PaymentMethod;
  payment_url?: string;
  receipt_url?: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
};
