import { FilterVacanciesType, AuthPropsType, FormType } from '@/types/types';

export const createPath = (
  url: string,
  path: string,
  params?: FilterVacanciesType | AuthPropsType
) => {
  let query = `${url}/${path}`;
  if (params) {
    query += `/?`;
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key) => {
      if (Array.isArray(params[key])) {
        const props = params[key];
        Array.isArray(props)
          ? props.forEach((item: number) => {
              query += `${key}[]=${item}&`;
            })
          : null;
      } else if (params[key]) {
        query += `${key}=${params[key]}&`;
      }
    });
  }
  return query;
};
