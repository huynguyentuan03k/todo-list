import { Publisher } from '../types/publisher.type';
import http from 'utils/http';

export const addPublisher = (publisher: Omit<Publisher, 'id' | 'created_at' | 'updated_at'>) =>
  http.post<Publisher>('/publishers', publisher);

export const updatePublisher = (id: number | string, publisher: Partial<Publisher>) =>
  http.put<Publisher>(`/publishers/${id}`, publisher);

export const deletePublisher = (id: number | string) => http.delete<{}>(`/publishers/${id}`);
