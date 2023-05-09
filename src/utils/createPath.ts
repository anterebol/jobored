import { FilterVacanciesType, AuthPropsType } from '@/types/types';

export const createPath = (
  url: string,
  path: string,
  params: FilterVacanciesType | AuthPropsType | undefined
) => {
  let way = `${url}/${path}`;
  if (params) {
    way += '/?';
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key: string) => {
      way += `${key}=${params[key]}&`;
    });
  }
  return way;
};
