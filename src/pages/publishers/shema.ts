import { z } from 'zod';

export const PublisherSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string().nullable(),
  email: z.string(),
  website: z.string(),
  phone: z.string(),
  established_year: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const PublishersSchema = z.array(PublisherSchema);

export type Publisher = z.infer<typeof PublisherSchema>;
export type Publishers = z.infer<typeof PublishersSchema>;
