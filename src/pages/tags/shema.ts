import { z } from "zod"

export const TagSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
})

export const TagsSchema = z.array(TagSchema)

export const TagFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
})

export type Tag = z.infer<typeof TagSchema>
export type Tags = z.infer<typeof TagsSchema>
export type TagForm = z.infer<typeof TagFormSchema>
