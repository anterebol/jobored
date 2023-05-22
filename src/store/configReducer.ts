import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import { createWrapper } from 'next-redux-wrapper';

export const store = () =>
  configureStore({
    reducer: appReducer,
  });

export type RootStore = ReturnType<typeof appReducer>;
export type AppStore = ReturnType<typeof store>;
export type appDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(store);
