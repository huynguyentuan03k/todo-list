import { z } from "zod"

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  password: z.string().optional(),
  email_verified_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
})

export const UsersSchema = z.array(UserSchema)

export const UserFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).optional(),
})

export type User = z.infer<typeof UserSchema>
export type Users = z.infer<typeof UsersSchema>
export type UserForm = z.infer<typeof UserFormSchema>
