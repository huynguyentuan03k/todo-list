import http from "utils/http"
import { User, Users } from "../types/users.type"

export const getUsers = (signal?: AbortSignal) =>
  http.get<{ data: Users }>("/users", { signal })

export const getUser = (id: number | string) =>
  http.get<{ data: User }>(`/users/${id}`)

export const addUser = (user: Omit<User, "id">) => http.post<User>("/users", user)

export const updateUser = (id: number | string, user: User) =>
  http.put<User>(`/users/${id}`, user)

export const deleteUser = (id: number | string) => http.delete<{}>(`/users/${id}`)
