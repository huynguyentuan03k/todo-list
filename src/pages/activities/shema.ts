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
const ActivityPropertiesSchema = z
  .object({
    attributes: z.record(z.any(), z.any()).optional(),
    old: z.record(z.any(), z.any()).optional(),
  })
  .nullable()
  .optional();

export const ActivitySchema = z.object({
  id: z.number(),
  event: z.string().nullable().optional(),
  log_name: z.string().nullable().optional(),
  subject_type: z.string(),

  properties: ActivityPropertiesSchema,

  created_at: z.union([z.date(), z.string(), z.date()]).nullable().optional(),
  updated_at: z.union([z.date(), z.string()]).nullable().optional(),
});

export const ActivitiesSchema = z.array(ActivitySchema);

export type Activity = z.infer<typeof ActivitySchema>;
export type Activities = z.infer<typeof ActivitiesSchema>;

export type ActivityResponse<T> = {
  data: T;
  meta: Meta;
  links: Links;
};
