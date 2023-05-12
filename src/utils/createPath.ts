import { FilterVacanciesType, AuthPropsType } from '@/types/types';

export const createPath = (
  url: string,
  path: string,
  params?: FilterVacanciesType | AuthPropsType,
  page?: number
) => {
  let way = `${url}/${path}`;
  if (params) {
    way += `/?count=4&${page ? 'page=' + page + '&' : ''}`;
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key) => {
      if (key !== 'ids') {
        way += `${key}=${params[key]}&`;
      } else {
        const { ids } = params;
        Array.isArray(ids)
          ? ids.forEach((item: number) => {
              way += `ids[]=${item}&`;
            })
          : null;
      }
    });
  }
  return way;
};
