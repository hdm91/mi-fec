import { HttpClient } from '../common/httpClient';
import { Category } from '../common/interfaces';

const categoryApi = '/categories';

export const getCategories = (): Promise<Category[]> => {
  return HttpClient.get<Category[]>(categoryApi).then((response) => response.data);
};
