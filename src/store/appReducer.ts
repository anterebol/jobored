import { VacancyType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getVacancies, getVacancy } from './api/api';
import { getFavorites } from '@/utils/getFavorites';

const initialState = {
  vacancies: [] as Array<VacancyType>,
  loaded: false,
  token: global.window ? localStorage.getItem('token') : '',
  favoritesId: getFavorites(),
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
      // state.loaded = true;
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
      console.log(vacancy);
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
export const { setVacancy, setFavorite, addFavorite, removeFavorite } = appSlice.actions;
export default appSlice.reducer;
