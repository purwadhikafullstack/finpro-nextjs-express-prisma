export type Role =
  | 'Driver'
  | 'Customer'
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
