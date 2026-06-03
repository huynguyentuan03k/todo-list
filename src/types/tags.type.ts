export interface Tag {
  id: number
  name: string
  slug?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export type Tags = Tag[]

export interface TagForm {
  name: string
  slug?: string
}

export interface TagResponse<T> {
  data: T
  meta?: {
    total: number
  }
}
