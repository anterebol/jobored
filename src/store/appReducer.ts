import { VacancyType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getVacancies, getVacancy } from './api/api';
import { getFavorites } from '@/utils/getFavorites';

const initialState = {
  vacancies: [] as Array<VacancyType>,
  loaded: false,
  token: global.window ? localStorage.getItem('token') : '',
  favorites: getFavorites(),
  favorite: {} as VacancyType,
  vacancy: {} as VacancyType,
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialState },
  reducers: {
    setVacancy: (state, action) => {
      state.vacancy = { ...action.payload };
    },
    setFavorite: (state, action) => {
      state.favorite = { ...action.payload };
    },
  },
  extraReducers: {
    [getToken.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.vacancies = [];
    },
    [getToken.rejected.type]: (state) => {
      localStorage.setItem('token', '');
    },
    [getVacancies.fulfilled.type]: (state, action) => {
      state.loaded = true;
      state.vacancies = [...action.payload];
    },
    [getVacancies.pending.type]: (state) => {
      state.loaded = false;
    },
    [getVacancies.rejected.type]: (state) => {
      localStorage.setItem('token', '');
    },
    [getVacancy.fulfilled.type]: (state, action) => {
      const { vacancy, vacancyType } = action.payload;
      if (vacancyType === 'favorite') {
        state.favorite = { ...vacancy };
      } else {
        state.vacancy = { ...vacancy };
      }
    },
    [getVacancy.rejected.type]: (state) => {
      localStorage.setItem('token', '');
    },
  },
});
export const { setVacancy, setFavorite } = appSlice.actions;
export default appSlice.reducer;
