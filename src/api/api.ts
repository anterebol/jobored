import { authProps } from '@/constants/authProps';
import { headers } from '@/constants/headers';
import { authPath, cataloguesPath, vacanciesPath } from '@/constants/path';
import { url } from '@/constants/url';
import { FilterVacanciesType } from '@/types/types';
import { createPath } from '@/utils/createPath';

export const getToken = async () => {
  const path = createPath(url, authPath, authProps);
  const response = await fetch(path, { method: 'GET', headers: headers, redirect: 'follow' }).then(
    async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.json();
      }
    }
  );
  const token = response.access_token;
  localStorage.setItem('token', token);
  return token;
};

export const getVacancies = async (
  token: string,
  vacanciesParams: FilterVacanciesType | undefined
) => {
  const path = vacanciesParams ? createPath(url, vacanciesPath, vacanciesParams) : '';
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
export const getVacancy = async (token: string, id: string) => {
  const path = createPath(url, vacanciesPath + `/${id}`, undefined);
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getCatalouge = async () => {
  const path = createPath(url, cataloguesPath, undefined);
  const response = await fetch(path, {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  });
  const data = await response.json();
  return data;
};
