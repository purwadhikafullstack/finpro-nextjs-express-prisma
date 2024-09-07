export interface Address {
  id?: number; // Address ID dari database (optional karena mungkin belum ada saat membuat baru)
  name: string;
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
  is_primary: boolean;
  isEditing?: boolean; // Properti tambahan untuk mode edit (optional)
}