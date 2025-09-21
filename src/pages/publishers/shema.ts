import { z } from 'zod';

export const PublisherSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  established_year: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  code: z.string().nullable().optional(),
});

export const PublishersSchema = z.array(PublisherSchema);

export type Publisher = z.infer<typeof PublisherSchema>;
export type Publishers = z.infer<typeof PublishersSchema>;
