import { z } from 'zod';

export type Meta = {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};
export type Links = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};
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
  created_at: z.union([z.date(), z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.date(), z.string()]).nullable().optional(),
});

export const PublishersSchema = z.array(PublisherSchema);

export type Publisher = z.infer<typeof PublisherSchema>;
export type Publishers = z.infer<typeof PublishersSchema>;

export type PublisherResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};
