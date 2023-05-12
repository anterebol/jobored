import { authProps } from '@/constants/authProps';
import { headers } from '@/constants/headers';
import { authPath, cataloguesPath, vacanciesPath } from '@/constants/path';
import { url } from '@/constants/url';
import { FilterVacanciesType } from '@/types/types';
import { createPath } from '@/utils/createPath';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getToken = createAsyncThunk('getToken', async (action, { rejectWithValue }) => {
  let token = localStorage.getItem('token');
  if (token) return token;
  try {
    const path = createPath(url, authPath, authProps);
    const response = await fetch(path, {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error(res.status.toString());
      } else {
        return await res.text().then((res) => JSON.parse(res));
      }
    });
    token = response.access_token as string;
    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getVacancies = createAsyncThunk(
  'getVacancies',
  async (
    {
      token,
      vacanciesParams,
      page,
    }: { token: string; vacanciesParams?: FilterVacanciesType; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const path = createPath(url, vacanciesPath, vacanciesParams, page);
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          return await res.text().then((res) => JSON.parse(res));
        }
      });
      return response.objects;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getVacancy = createAsyncThunk(
  'getVacancy',
  async (
    { token, id, vacancyType }: { token: string; id: string; vacancyType: string },
    { rejectWithValue }
  ) => {
    try {
      const path = createPath(url, vacanciesPath + `/${id}`, undefined);
      const response = await fetch(path, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(res.status.toString());
        } else {
          return await res.text().then((res) => JSON.parse(res));
        }
      });
      return { vacancy: response, vacancyType };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
