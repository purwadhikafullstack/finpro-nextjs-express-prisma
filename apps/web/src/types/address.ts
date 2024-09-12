export type Address = {
  customer_address_id: string;
  is_primary: boolean;
  name: string;
  address: string;
  formatted?: string;
  road?: string;
  city?: string;
  city_district?: string;
  region?: string;
  suburb?: string;
  zipcode?: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
};
