import { FilterVacanciesType, AuthPropsType, FormType } from '@/types/types';

export const createPath = (
  url: string,
  path: string,
  params?: FilterVacanciesType | AuthPropsType
) => {
  let way = `${url}/${path}`;
  if (params) {
    way += `/?`;
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key) => {
      if (Array.isArray(params[key])) {
        const props = params[key];
        Array.isArray(props)
          ? props.forEach((item: number) => {
              way += `${key}[]=${item}&`;
            })
          : null;
      } else if (params[key]) {
        way += `${key}=${params[key]}&`;
      }
    });
  }
  return way;
};
