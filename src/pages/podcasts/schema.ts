import { z } from 'zod';
import { PublisherSchema } from '../publishers/shema';
import { CategoriesSchema } from '../categories/shema';

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
  title: z.string(),
  description: z.string().nullable(),
  slug: z.string().nullable(),
  cover_image: z.string().nullable(),
  cover_url: z.string().nullable(),
  publisher: PublisherSchema.nullable(),
  content: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
  categories: CategoriesSchema,
});

export const PodcastsSchema = z.array(PodcastSchema);

export type Podcast = z.infer<typeof PodcastSchema>;
export type Podcasts = z.infer<typeof PodcastsSchema>;
export type PodcastResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};

export type PodcastForm = {
  title: string;
  description: string;
  slug: string;
  cover_url?: string;
  cover_image: File | undefined;
  publisher_id: number | undefined;
  category_ids: number[];
  author_ids: number[];
  content: string;
};
