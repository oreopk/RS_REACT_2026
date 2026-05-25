import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './slice';

export const store = configureStore({
  reducer: {
    selected: selectedReducer,
  },
});
