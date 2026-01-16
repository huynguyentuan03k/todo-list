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
export const EpisodeSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  audio_path: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
  file_size: z.number().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  podcast_id: z.number().nullable().optional(),
  cover_image: z.string().nullable(),
  slug: z.int().nullable(),
  created_at: z.union([z.date(), z.string(), z.date()]).nullable(),
  updated_at: z.union([z.date(), z.string()]).nullable(),
});

export const EpisodesSchema = z.array(EpisodeSchema);

export type Episode = z.infer<typeof EpisodeSchema>;
export type Episodes = z.infer<typeof EpisodesSchema>;

export type EpisodeResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};

export type episodeForm = {
  id: number;
  title: string;
  description: string;
  audio_path: string;
  podcast_id: number;
  slug: string;
  cover_image: File;
};
