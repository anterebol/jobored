import { authProps } from '@/constants/authProps';
import { headers } from '@/constants/headers';
import { authPath, cataloguesPath, vacanciesPath } from '@/constants/path';
import { url } from '@/constants/url';
import { FilterVacanciesType, AuthPropsType } from '@/types/types';
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
  localStorage.setItem('token', response.access_token);
  return response.access_token;
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
      'X-Api-App-Id':
        'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getCatalouge = async () => {
  const path = createPath(url, cataloguesPath, undefined);
  const catalogues = await fetch(path, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'content-type': 'application/json',
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    },
    redirect: 'follow',
  });
  const data = await catalogues.json();
  return {
    props: {
      data: data,
    },
  };
};
