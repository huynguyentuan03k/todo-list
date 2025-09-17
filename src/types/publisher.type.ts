export interface Publisher {
  id: number;
  name: string;
  address: string;
  email: string;
  website: string;
  phone: string;
  established_year: number;
  created_at: string;
  updated_at: string;
}

export type Publishers = Publisher[];
