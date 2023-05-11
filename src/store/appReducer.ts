import { VacancyType } from './../types/types';
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getVacancies } from './api/api';

const initialState = {
  vacancies: [] as Array<VacancyType>,
  loaded: false,
  token: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState: { ...initialState },
  reducers: {},
  extraReducers: {
    [getToken.fulfilled.type]: (state, action) => {
      console.log(action.payload);
      state.token = action.payload;
    },
    [getToken.rejected.type]: (state) => {
      console.log('x');
    },
    [getVacancies.fulfilled.type]: (state, action) => {
      state.loaded = true;
      state.vacancies = [...action.payload];
    },
    [getVacancies.pending.type]: (state) => {
      state.loaded = false;
    },
    [getVacancies.rejected.type]: (state) => {
      console.log('x');
    },
  },
});

export default appSlice.reducer;
