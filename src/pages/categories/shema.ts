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
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  established_year: z.number().nullable().optional(),
  created_at: z.union([z.date(), z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.date(), z.string()]).nullable().optional(),
});

export const CategoriesSchema = z.array(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;

export type CategoryResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};
