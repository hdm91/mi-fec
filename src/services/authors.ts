import { HttpClient } from '../common/httpClient';
import { Author } from '../common/interfaces';

const authorApi = '/authors';

export const getAuthors = (): Promise<Author[]> => {
  return HttpClient.get<Author[]>(authorApi).then((response) => response.data);
};

export const getAuthorById = (id: number): Promise<Author> => {
  return HttpClient.get<Author>(`${authorApi}/${id}`).then((response) => response.data);
};

export const updateAuthor = (author: Author): Promise<Author> => {
  return HttpClient.put(`${authorApi}/${author.id}`, author).then((response) => response.data);
};
