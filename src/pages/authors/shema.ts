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
export const AuthorSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  bio: z.string().nullable(),
  avatar: z.string().nullable(),
  email: z.string().nullable(),
  website: z.string().nullable(),
  created_at: z.union([z.date(), z.string(), z.date()]).nullable(),
  updated_at: z.union([z.date(), z.string()]).nullable(),
});

export const AuthorsSchema = z.array(AuthorSchema);

export type Author = z.infer<typeof AuthorSchema>;
export type Authors = z.infer<typeof AuthorsSchema>;

export type AuthorResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};

export type AuthorForm = {
  avatar?: File;
  name: string;
  bio: string;
  email: string;
  website: string;
};
