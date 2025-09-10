export interface Bodyguard {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  image_url: string | null;
  experience: number;
  hourly_rate: number;
  location: string;
  status: string;
  created_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  bodyguard_id: string;
  booking_date: string;
  booking_time: string;
  duration_hours: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  special_requirements?: string;
  created_at: string;
  updated_at: string;
  bodyguard?: Bodyguard;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}