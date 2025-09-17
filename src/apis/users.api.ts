import { Users, User } from '../types/users.type';
import http from 'utils/http';

export const getUsers = (page: number | string, limit: number | string, signal?: AbortSignal) =>
  http.get<Users>('Users', {
    params: {
      _page: page,
      _limit: limit,
    },
    signal,
  });

export const getUser = (id: number | string) => http.get<User>(`Users/${id}`);

export const addUser = (User: Omit<User, 'id'>) => http.post<User>('/Users', User);

export const updateUser = (id: number | string, User: User) => http.put<User>(`Users/${id}`, User);

export const deleteUser = (id: number | string) => http.delete<{}>(`Users/${id}`);
