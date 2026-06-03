import http from "@/utils/http"
import { Tag, Tags } from "@/types/tags.type"

export const getTags = (signal?: AbortSignal) =>
  http.get<{ data: Tags }>("/tags", { signal })

export const getTag = (id: number | string) => http.get<{ data: Tag }>(`/tags/${id}`)

export const addTag = (tag: Omit<Tag, "id">) => http.post<Tag>("/tags", tag)

export const updateTag = (id: number | string, tag: Tag) => http.put<Tag>(`/tags/${id}`, tag)

export const deleteTag = (id: number | string) => http.delete<{}>(`/tags/${id}`)
