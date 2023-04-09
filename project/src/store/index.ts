import {configureStore} from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/serverApi';

export const serverApi = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk: {extraArgument: serverApi}})
});
