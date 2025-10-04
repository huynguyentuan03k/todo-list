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
  id: z.number(),
  name: z.string().nullable(), // type : string | null
  description: z.string().nullable(),
  slug: z.string().nullable(),
  address: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  established_year: z.number().nullable().optional(), // type : string | null | undefinded
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const PublishersSchema = z.array(PublisherSchema);

export type Publisher = z.infer<typeof PublisherSchema>;
export type Publishers = z.infer<typeof PublishersSchema>;

export type PublisherResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};
/***
 * 1 PublisherSchema la single object, con PublishersSchema la array
 */
