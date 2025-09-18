import { z } from 'zod';

export const PublisherSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email format'),
  website: z.string().url('Invalid website URL'),
  phone: z.string().regex(/^[0-9]{9,15}$/, 'Phone must be 9–15 digits'),
  established_year: z.number().int().min(1800).max(new Date().getFullYear()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const PublishersSchema = z.array(PublisherSchema);

export type Publisher = z.infer<typeof PublisherSchema>;
export type Publishers = z.infer<typeof PublishersSchema>;
