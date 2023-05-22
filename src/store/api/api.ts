import { authProps } from '@/constants/authProps';
import { headers } from '@/constants/query/headers';
import { AUTH_PATH, CATALOGUES_PATH, VACANCIES_PATH } from '@/constants/query/path';
import { URL } from '@/constants/query/url';
import {
  GET_TOKEN,
  GET_VACANCIES,
  GET_VACANCY,
  GET_CATALOUGE,
} from '@/constants/thunks/thunksName';
import { VacanciesRequestType, VacancyRequestType } from '@/types/requestTypes';
import { createPath } from '@/utils/createPath';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getToken = createAsyncThunk(GET_TOKEN, async (_, { rejectWithValue }) => {
  let token = localStorage.getItem('token');
  if (token) return token;
  try {
    const path = createPath(URL, AUTH_PATH, authProps);
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
  GET_VACANCIES,
  async ({ token, vacanciesParams }: VacanciesRequestType, { rejectWithValue }) => {
    try {
      const path = createPath(URL, VACANCIES_PATH, vacanciesParams);
      if (!path) return [];
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
  GET_VACANCY,
  async ({ token, id, vacancyType }: VacancyRequestType, { rejectWithValue }) => {
    try {
      const path = createPath(URL, VACANCIES_PATH + `/${id}`, undefined);
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

export const getCatalouge = createAsyncThunk(GET_CATALOUGE, async (_, { rejectWithValue }) => {
  try {
    const path = createPath(URL, CATALOGUES_PATH, undefined);
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
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});
