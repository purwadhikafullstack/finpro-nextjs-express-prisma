export type OrderProgress = {
  order_progrses_id: string;
  order_id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Order = {
  order_id: string;
  outlet_id: string;
  customer_id: string;
  customer_address_id: string;
  delivery_fee: number;
  laundry_fee: number;
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
