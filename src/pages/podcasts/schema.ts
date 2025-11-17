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

export const PodcastSchema = z.object({
  id: z.number(),
  title: z.string().nullable(), // type : string | null
  description: z.string().nullable(),
  slug: z.string().nullable(),
  cover_image: z.string().nullable(),
  publisher_id: z.number().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const PodcastsSchema = z.array(PodcastSchema);

export type Podcast = z.infer<typeof PodcastSchema>;
export type Podcasts = z.infer<typeof PodcastsSchema>;
export type PodcastResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};
