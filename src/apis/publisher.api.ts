import { Publishers, Publisher } from '../types/publisher.type';
import http from 'utils/http';

export const getPublishers = (
  page: number | string,
  limit: number | string,
  signal?: AbortSignal
) =>
  http.get<Publishers>('/publishers', {
    params: {
      page,
      limit,
    },
    signal,
  });

export const getPublisher = (id: number | string) => http.get<Publisher>(`/publishers/${id}`);

export const addPublisher = (publisher: Omit<Publisher, 'id' | 'created_at' | 'updated_at'>) =>
  http.post<Publisher>('/publishers', publisher);

export const updatePublisher = (id: number | string, publisher: Partial<Publisher>) =>
  http.put<Publisher>(`/publishers/${id}`, publisher);

export const deletePublisher = (id: number | string) => http.delete<{}>(`/publishers/${id}`);
