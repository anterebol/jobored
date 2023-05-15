import { VacancyType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getVacancies, getVacancy } from './api/api';
import { getFavorites } from '@/utils/getFavorites';

const initialState = {
  vacancies: [] as Array<VacancyType>,
  loaded: true,
  token: global.window ? localStorage.getItem('token') : '',
  favoritesId: getFavorites(),
  favorite: {} as VacancyType,
  vacancy: {} as VacancyType,
  currentPage: {
    favorites: 1,
    vacancies: 1,
  },
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
    addFavorite: (state, action) => {
      localStorage.setItem('favorites', JSON.stringify([...state.favoritesId, action.payload]));
      state.favoritesId.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const favoritesId = [...state.favoritesId];
      favoritesId.splice(action.payload.indexId, 1);
      localStorage.setItem('favorites', JSON.stringify(favoritesId));
      state.favorite = {} as VacancyType;
      state.favoritesId = [...favoritesId];
    },
    currentPageSet: (state, action) => {
      const { type, page } = action.payload;
      if (type === 'vacancies') {
        state.currentPage = { ...state.currentPage, vacancies: page };
      } else {
        state.currentPage = { ...state.currentPage, favorites: page };
      }
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
      state.loaded = true;
      localStorage.setItem('token', '');
    },
    [getVacancy.fulfilled.type]: (state, action) => {
      const { vacancy, vacancyType } = action.payload;
      if (vacancyType === 'favorite') {
        state.favorite = { ...vacancy };
      } else {
        state.vacancy = { ...vacancy };
      }
      state.loaded = true;
    },
    [getVacancy.pending.type]: (state) => {
      state.loaded = false;
    },
    [getVacancy.rejected.type]: (state) => {
      localStorage.setItem('token', '');
      state.loaded = true;
    },
  },
});
export const { setVacancy, setFavorite, addFavorite, removeFavorite, currentPageSet } =
  appSlice.actions;
export default appSlice.reducer;
