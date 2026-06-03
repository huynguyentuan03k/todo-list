export interface User {
  id: number
  name: string
  email: string
  password?: string
  email_verified_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type Users = User[]
