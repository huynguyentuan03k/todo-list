import http from 'utils/http';

export const deletePublisher = (id: number | string) => http.delete<{}>(`/publishers/${id}`);
