export type Role =
  | 'Driver'
  | 'Customer'
  | 'Employee'
  | 'SuperAdmin'
  | 'OutletAdmin'
  | 'WashingWorker'
  | 'IroningWorker'
  | 'PackingWorker';

export type User = {
  user_id: string;
  fullname: string;
  phone: string;
  role: Role;
  email: string;
  avatar_url: string;
  is_verified: boolean;
};

export type Customer = {
  customer_id: string;
  user_id: string;
};

export type Employee = {
  employee_id: string;
  user_id: string;
  outlet_id?: string;
  shift_id?: string;
};
