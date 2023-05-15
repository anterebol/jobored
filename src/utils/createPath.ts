import { FilterVacanciesType, AuthPropsType } from '@/types/types';

export const createPath = (
  url: string,
  path: string,
  params?: FilterVacanciesType | AuthPropsType,
  isFavorites?: boolean
) => {
  console.log(isFavorites);
  let way = `${url}/${path}`;
  if (params) {
    way += `/?`;
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
